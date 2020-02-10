import React from "react";
import {List, Map} from "immutable";
import {NextPluginRenderer} from "../Schema/EditorWidgetStack";

const ERROR_NOT_SET = 'required-not-set';

const checkValueExists = (type, value) => {
    const valType = typeof value;

    if(valType === 'undefined') {
        return false;
    }

    if(type === 'string') {
        return (valType === 'string' && value.trim().length);
    } else if(type === 'number' || type === 'integer') {
        // 0 is also a valid number, so not checking for false here
        return (valType === 'number')
    } else if(type === 'boolean') {
        // a required boolean property must be `true` to be considered set
        return (valType === 'boolean' && value);
    } else if(type === 'array') {
        // not checking content of array here, only if one item exists
        if(Array.isArray(value)) {
            if(!value.length) {
                return false;
            }
        } else if(List.isList(value)) {
            if(!value.size) {
                return false;
            }
        }

    } else if(type === 'object') {
        if(Map.isMap(value)) {
            /**
             * @var {Map} value
             */
            if(!value.keySeq().size) {
                return false;
            }
        } else if(valType === 'object') {
            if(!Object.keys(value).length) {
                return false;
            }
        }
    }

    return true;
};

const RequiredValidator = (props) => {
    const {
        ownKey, required, schema, value
    } = props;

    let {errors} = props;

    let {valid} = props;

    let type = schema.get('type');

    let isRequired = false;
    if(required && List.isList(required)) {
        isRequired = required.contains(ownKey);
    }

    if(!isRequired) return <NextPluginRenderer {...props} valid={valid} errors={errors} required={false}/>;

    const valType = typeof value;

    if(valType === 'undefined') {
        valid = false;
        errors = errors.push(ERROR_NOT_SET);
        return <NextPluginRenderer {...props} valid={valid} errors={errors} required/>;
    }

    if(!checkValueExists(type, value)) {
        valid = false;
        errors = errors.push(ERROR_NOT_SET);
    }

    return <NextPluginRenderer {...props} valid={valid} errors={errors} required/>;
};

export {RequiredValidator, ERROR_NOT_SET, checkValueExists}
