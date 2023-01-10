import * as Extent from 'ol/extent'
import Point from 'ol/geom/Point'
import Geometry from 'ol/geom/Geometry'

const defaultOptions = {
  duration: 3000,
  zoom: 15,
  maxZoom: 15
}

/**
 * A collection of view animations to zoom an OpenLayers view to a given location or extent.
 * Inspired by http://openlayers.org/en/latest/examples/animation.html
 */
export const useViewAnimation = () => {
  /**
   * No animation.
   * @private
   */
  const NoAnimation = {
    /**
     * Zoom to the given location by not using animations.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} zoom An optional final zoom level.
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toLocation ({ view, location, completionCallback, options }) {
    // Set defaults if arguments are not provided.
      const zoom = options.zoom ?? view.getZoom()
      const maxZoom = options.maxZoom ?? Infinity

      this.animate({ view, location, completionCallback, zoom, maxZoom })
    },

    /**
     * Zoom to fit the given extentby not using animations.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Extent} extent The destination extent to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toExtent ({ view, extent, completionCallback, options }) {
    // Set defaults if arguments are not provided.
      const maxZoom = options.maxZoom ?? Infinity

      // Zoom to the given extent.
      const resolution = view.getResolutionForExtent(extent)
      const zoom = view.getZoomForResolution(resolution) - 0.2
      const location = Extent.getCenter(extent)

      this.animate({ view, location, completionCallback, zoom, maxZoom })
    },

    /**
     * Move to the location.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Number} zoom The final zoom level.
     * @param {Number} maxZoom The maximal zoom level.
     */
    animate ({ view, location, completionCallback, zoom, maxZoom }) {
      view.fit(new Point(location), {
        maxZoom: Math.min(zoom, maxZoom),
        callback: completionCallback
      })
    }
  }

  /**
   * A pan animation.
   * Remarks: This may also zoom in / zoom out, if a zoom level has been provided or the toExtent method
   *  is used.
   * @private
   */
  const PanAnimation = {
    /**
     * Zoom to the given location by using a "pan" animation.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} duration An optional animation duration.
     * * {Number} zoom An optional final zoom level.
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toLocation ({ view, location, completionCallback, options }) {
    // Set defaults if arguments are not provided.
      const duration = options.duration ?? 3000
      const zoom = options.zoom ?? view.getZoom()
      const maxZoom = options.maxZoom ?? Infinity

      this.animate({ view, location, completionCallback, duration, zoom, maxZoom })
    },

    /**
     * Zoom to fit the given extent by using a "pan" animation.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Extent} extent The destination extent to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} duration An optional animation duration.
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toExtent ({ view, extent, completionCallback, options }) {
    // Set defaults if arguments are not provided.
      const duration = options.duration ?? 3000
      const maxZoom = options.maxZoom ?? Infinity

      // Zoom to the given extent.
      const resolution = view.getResolutionForExtent(extent)
      const zoom = view.getZoomForResolution(resolution) - 0.2
      const location = Extent.getCenter(extent)

      this.animate({ view, location, completionCallback, duration, zoom, maxZoom })
    },

    /**
     * Pan / zoom to the location.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Number} duration The animation duration.
     * @param {Number} zoom The final zoom level.
     * @param {Number} maxZoom The maximal zoom level.
     */
    animate ({ view, location, completionCallback, duration, zoom, maxZoom }) {
      function callback (complete) {
        if (completionCallback) {
          completionCallback(complete)
        }
      }

      view.animate({
        center: location,
        duration,
        zoom: Math.min(zoom, maxZoom)
      }, callback)
    }
  }

  /**
   * A fly animation.
   * @private
   */
  const FlyAnimation = {

    /**
     * Zoom to the given location by using a "fly" animation.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} duration An optional animation duration.
     * * {Number} zoom An optional final zoom level.
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toLocation ({ view, location, completionCallback, options }) {
    // Set defaults if arguments are not provided.
      const duration = options.duration ?? 3000
      const zoom = options.zoom ?? view.getZoom()
      const maxZoom = options.maxZoom ?? Infinity

      // Zoom out to have both locations visible.
      const extentOut = view.calculateExtent()
      Extent.extend(extentOut, Extent.boundingExtent([location]))
      const resolutionOut = view.getResolutionForExtent(extentOut)
      const zoomOut = view.getZoomForResolution(resolutionOut) - 1

      this.animate({ view, location, completionCallback, duration, zoomOut, zoom, maxZoom })
    },

    /**
     * Zoom to fit the given extent by using a "fly" animation.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Extent} extent The destination extent to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} duration An optional animation duration.
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toExtent ({ view, extent, completionCallback, options }) {
      console.log(options)
      // Set defaults if arguments are not provided.
      const duration = options.duration ?? 3000
      const maxZoom = options.maxZoom ?? Infinity

      // Zoom out to have both locations visible.
      const extentOut = view.calculateExtent()
      Extent.extend(extentOut, extent)
      const resolutionOut = view.getResolutionForExtent(extentOut)
      const zoomOut = view.getZoomForResolution(resolutionOut) - 1

      // Then zoom in to the given extent.
      const resolutionIn = view.getResolutionForExtent(extent)
      const zoom = view.getZoomForResolution(resolutionIn) - 0.2
      const location = Extent.getCenter(extent)

      this.animate({ view, location, completionCallback, duration, zoomOut, zoom, maxZoom })
    },

    /**
     * The animation consist of 2 simultaneous parts:
     * Zoom out then zoom in, while moving to the center location.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Number} duration The animation duration.
     * @param {Number} zoomOut The zoom out level.
     * @param {Number} zoom The final zoom level.
     * @param {Number} maxZoom The maximal zoom level.
     */
    animate ({ view, location, completionCallback, duration, zoomOut, zoom, maxZoom }) {
      let parts = 2
      let finished = false

      function callback (complete) {
        --parts
        if (finished) {
          return
        }
        if (parts === 0 || !complete) {
          finished = true
          if (completionCallback) {
            completionCallback(complete)
          }
        }
      }

      view.animate({
        center: location,
        duration
      }, callback)

      view.animate({
        zoom: zoomOut,
        duration: duration / 2
      }, {
        zoom: Math.min(zoom, maxZoom),
        duration: duration / 2
      }, callback)
    }
  }

  /**
   * A bounce animation.
   * @private
   */
  const BounceAnimation = {
    /**
     * Zoom to the given location by using a "bounce" animation.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} duration An optional animation duration.
     * * {Number} zoom An optional final zoom level.
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toLocation ({ view, location, completionCallback, options }) {
      // Set defaults if arguments are not provided.
      const duration = options.duration ?? 3000
      const zoom = options.zoom ?? view.getZoom()
      const maxZoom = options.maxZoom ?? Infinity

      this.animate({ view, location, completionCallback, duration, zoom, maxZoom })
    },

    /**
     * Zoom to fit the given extent by using a "bounce" animation.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Extent} extent The destination extent to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Object} options Configuration object for the animation, supported attributes are:
     * * {Number} duration An optional animation duration.
     * * {Number} maxZoom An optional maximal zoom level.
     */
    toExtent ({ view, extent, completionCallback, options }) {
      // Set defaults if arguments are not provided.
      const duration = options.duration ?? 3000
      const maxZoom = options.maxZoom ?? Infinity

      // Zoom to the given extent.
      const resolution = view.getResolutionForExtent(extent)
      const zoom = view.getZoomForResolution(resolution) - 0.2
      const location = Extent.getCenter(extent)

      this.animate({ view, location, completionCallback, duration, zoom, maxZoom })
    },

    /**
     * An elastic easing method
     * (from https://github.com/DmitryBaranovskiy/raphael).
     * @private
     */
    elastic (t) {
      return Math.pow(2, -10 * t) * Math.sin((t - 0.075) *
              (2 * Math.PI) / 0.3) + 1
    },

    /**
     * The animation consist of 2 simultaneous parts:
     * Zoom in or out, while moving to the center location.
     * @param {ol.View} view The `ol.View` of the map.
     * @param {ol.Coordinate} location The destination center point to zoom to.
     * @param {function(complete)} completionCallback An optional notification that the animation has completed.
     * @param {Number} duration The animation duration.
     * @param {Number} zoom The final zoom level.
     * @param {Number} maxZoom The maximal zoom level.
     */
    animate ({ view, location, completionCallback, duration, zoom, maxZoom }) {
      let parts = 2
      let finished = false

      function callback (complete) {
        --parts
        if (finished) {
          return
        }
        if (parts === 0 || !complete) {
          finished = true
          if (completionCallback) {
            completionCallback(complete)
          }
        }
      }

      view.animate({
        center: location,
        duration,
        easing: this.elastic
      }, callback)

      view.animate({
        zoom: Math.min(zoom, maxZoom),
        duration
      }, callback)
    }
  }

  /**
   * Returns the animation object.
   * @param {String} animType Animation type string.
   * @returns The animation object.
   * @private
   */
  const getAnimation = (animType) => {
    const animations = {
      none: NoAnimation,
      pan: PanAnimation,
      fly: FlyAnimation,
      bounce: BounceAnimation,
      default: NoAnimation
    }

    return animations[animType] || animations.default
  }

  /**
   * Zoom to the given destination.
   * @param {ol.View} view The `ol.View` of the map.
   * @param {ol.Coordinate | ol.Extent | ol.geom.Geometry} destination
   *  The destination coordinate, point, geometry or extent to zoom to.
   * @param {*} completionCallback An optional notification that the animation has completed.
   * @param {*} options Optional configuration object for the animation.
   */
  const to = ({ type = 'none', view, destination, completionCallback, options = defaultOptions }) => {
    if (destination instanceof Point) {
      toLocation({ type, view, location: destination.getCoordinates(), completionCallback, options })
    } else if (destination instanceof Geometry) {
      toExtent({ type, view, extent: destination.getExtent(), completionCallback, options })
    } else if (Array.isArray(destination) && destination.length === 2) {
      toLocation({ type, view, location: destination, completionCallback, options })
    } else if (Array.isArray(destination) && destination.length === 4) {
      toExtent({ type, view, extent: destination, completionCallback, options })
    } else {
      console.error('Unsupported type for destination.')
    }
  }

  /**
   * Zoom to the given location.
   * @param {ol.View} view The `ol.View` of the map.
   * @param {ol.Coordinate} location The destination center point to zoom to.
   * @param {function(complete)} completionCallback An optional notification that the animation has completed.
   * @param {Object} options Optional configuration object for the animation.
   */
  const toLocation = ({ type, view, location, completionCallback, options }) => {
    getAnimation(type).toLocation({ view, location, completionCallback, options })
  }

  /**
   * Zoom to the given extent.
   * @param {ol.View} view The `ol.View` of the map.
   * @param {ol.Extent} extent The destination extent to zoom to.
   * @param {function(complete)} completionCallback An optional notification that the animation has completed.
   * @param {Object} options Optional configuration object for the animation.
   */
  const toExtent = ({ type, view, extent, completionCallback, options }) => {
    getAnimation(type).toExtent({ view, extent, completionCallback, options })
  }

  return {
    to,
    toLocation,
    toExtent
  }
}
