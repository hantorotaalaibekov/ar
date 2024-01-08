// height-offset
AFRAME.registerComponent('height-offset', {
  schema: { 
    value: { type: 'number', default: 0 } 
  },

  init: function () {
    this.height = this.data.value
  },

  update: function () {
    const height = this.el.object3D.position.y - this.height
    this.el.object3D.position.y = height + this.data.value
    this.height = this.data.value
  }
})


// mesh-color
AFRAME.registerComponent('mesh-color', {
  schema: {
    color: { type: 'string', default: '#fff' },
    opacity: { type: 'number', default: 0.7 }
  },

  init: function () {
    this.el.addEventListener('model-loaded', () => {
      this._setMaterial()
    }, { once: true })

    this.el.addEventListener('model-error', (error) => {
      console.error('Model Error.\n' + error.detail.src)
    }, { once: true })
  },

  update: function () {
    this._setMaterial()
  },

  _setMaterial: function () {
    this.el.getObject3D('mesh')?.traverse((node) => {
      if (node.isMesh) {
        node.material.transparent = true
        node.material.opacity = this.data.opacity
        node.material.color.set(this.data.color)
        node.material.setValues({ depthWrite: false })
        node.material.setValues({ side: THREE.FrontSide })
      }
    })
  }
})
