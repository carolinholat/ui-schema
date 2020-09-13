import * as React from 'react'
import { WidgetProps } from '@ui-schema/ui-schema/Widget'
import { CSSProperties } from 'react'

export interface ColorBaseProps extends WidgetProps {
    value: string
    styles: CSSProperties
    refocus: boolean
    forceIcon: boolean
    pickerProps: object
    PickerContainer: React.ReactElement
    ColorPicker: React.ReactElement
}

export function ColorBase<P extends ColorBaseProps>(props: P): React.ReactElement<P>
