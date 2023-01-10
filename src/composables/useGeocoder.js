import { inject } from 'vue'
import { has } from 'lodash' // eslint-disable-line

class OpenStreetMap {
  constructor () {
    this.settings = {
      url: 'https://nominatim.openstreetmap.org/search/',
      params: {
        q: '',
        format: 'json',
        addressdetails: 1,
        limit: 10,
        countrycodes: '',
        'accept-language': 'en-US'
      }
    }
  }

  getParameters (opt) {
    return {
      url: this.settings.url,
      params: {
        q: opt.query,
        format: this.settings.params.format,
        addressdetails: this.settings.params.addressdetails,
        limit: opt.limit || this.settings.params.limit,
        countrycodes: opt.countrycodes || this.settings.params.countrycodes,
        'accept-language': opt.lang || this.settings.params['accept-language']
      }
    }
  }

  handleResponse (results) {
    if (!results || results.length === 0) return

    return results.map(result => {
      result = {
        lon: Number.parseFloat(result.lon),
        lat: Number.parseFloat(result.lat),
        boundingbox: result.boundingbox.map(x => Number.parseFloat(x)),
        address: {
          name: result.display_name,
          road: result.address.road || '',
          houseNumber: result.address.house_number || '',
          postcode: result.address.postcode || '',
          city: result.address.city || result.address.town || '',
          state: result.address.state || '',
          country: result.address.country || ''
        },
        original: {
          formatted: result.display_name,
          details: result.address
        }
      }
      // Make bbox llx,lly,urx,ury
      const bbox = result.boundingbox
      result.boundingbox = [bbox[2], bbox[0], bbox[3], bbox[1]]
      return result
    })
  }
}

class Photon {
  constructor () {
    this.settings = {
      url: 'https://photon.komoot.de/api/',
      params: {
        q: '',
        limit: 10,
        lang: 'en'
      },
      langs: ['de', 'it', 'fr', 'en']
    }
  }

  getParameters (options) {
    options.lang = options.lang.toLowerCase()

    return {
      url: this.settings.url,
      params: {
        q: options.query,
        limit: options.limit || this.settings.params.limit,
        lang:
          this.settings.langs.indexOf(options.lang) > -1
            ? options.lang
            : this.settings.params.lang
      }
    }
  }

  handleResponse (results) {
    if (!results.features.length) return
    return results.features.map(function (feature) {
      // Response is GeoJSON
      const geometry = feature.geometry
      const properties = feature.properties
      const displayName = `${properties.name} ${properties.city || ''} ${properties.postcode || ''} ${properties.state || ''} ${properties.country || ''}`
      const result = {
        lon: geometry.coordinates[0],
        lat: geometry.coordinates[1],
        address: {
          name: displayName,
          postcode: properties.postcode || '',
          city: properties.city || '',
          state: properties.state || '',
          country: properties.country || ''
        },
        original: {
          formatted: displayName,
          details: properties
        }
      }
      // Sometimes has bbox
      if (properties.extent) {
        result.boundingbox = properties.extent
      }
      return result
    })
  }
}

class OpenCage {
  constructor () {
    this.settings = {
      url: 'https://api.opencagedata.com/geocode/v1/json?',
      params: {
        q: '',
        key: '',
        limit: 10,
        countrycodes: '',
        language: 'en-US',
        pretty: 1,
        no_annotations: 1
      }
    }
  }

  getParameters (options) {
    return {
      url: this.settings.url,
      params: {
        q: options.query,
        key: options.key,
        limit: options.limit || this.settings.params.limit,
        countrycode: options.countrycodes || this.settings.params.countrycodes,
        language: options.language || this.settings.params.language
      }
    }
  }

  handleResponse (results) {
    if (!results.results || results.results.length === 0) {
      return
    }
    return results.results.map(result => ({
      lon: result.geometry.lng,
      lat: result.geometry.lat,
      boundingbox: result.bounds && [result.bounds.southwest.lng, result.bounds.southwest.lat, result.bounds.northeast.lng, result.bounds.northeast.lat],
      address: {
        name: result.formatted,
        road: result.components.road || '',
        houseNumber: result.components.house_number || '',
        postcode: result.components.postcode || '',
        city: result.components.city || result.components.town || '',
        state: result.components.state || '',
        country: result.components.country || ''
      },
      original: {
        formatted: result.formatted,
        details: result.components
      }
    }))
  }
}

const providers = {
  osm: OpenStreetMap,
  photon: Photon,
  opencage: OpenCage
}

export const useGeocoder = ({ providerName, options }) => {
  if (!has(providers, providerName)) {
    console.warn(`No class defined for Geocoder Provider: '${providerName}'`)
    return
  }

  const $getGeoData = inject('$getGeoData')

  const prov = new providers[providerName]()

  const query = async q => {
    const parameters = prov.getParameters({
      query: q,
      key: options.key,
      lang: options.lang,
      countrycodes: options.countrycodes,
      limit: options.limit
    })

    try {
      const res = await $getGeoData({ url: parameters.url, params: parameters.params })
      return prov.handleResponse(res)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    providers,
    query
  }
}
