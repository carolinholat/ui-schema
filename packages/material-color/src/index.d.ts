import * as React from 'react'

export * from './Base'
export * from './Color'
export * from './Alpha'
export * from './Block'
export * from './Circle'
export * from './Color'
export * from './Compact'
export * from './Hue'
export * from './Material'
export * from './Sketch'
export * from './Slider'
export * from './Swatches'
export * from './Twitter'

export type ColorPicker = React.ComponentType
export type PickerContainer = React.ReactElement
export type styleWrapper = (palette: object, spacing: Function) => object
