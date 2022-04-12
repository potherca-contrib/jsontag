import TSONType from './lib/TSONType.mjs'
import UUID from './lib/UUID.mjs'
import Decimal from './lib/Decimal.mjs'
import Money from './lib/Money.mjs'
import TSONArray from './lib/Array.mjs'
import TSONObject from './lib/Object.mjs'

export default class TSON 
{

	static {
		TSON.UUID = UUID
		TSON.Decimal = Decimal
		TSON.Money = Money
//		TSON["Object"] = TSONObject
//		TSON.Array = TSONArray
	}

	static stringify(value)
	{
		if (value instanceof TSONType) {
			return value.toTSON()
		} else if (Array.isArray(value)) {
			return '['+TSON.encodeEntries(value)+']'
		} else if (value instanceof Object) {
			if (typeof value.toTSON === 'function') {
				return value.toTSON()
			} else if (typeof value.toJSON === 'function') {
				return value.toJSON()
			} else {
				//@FIXME: avoid circular references
				return '{' + TSON.encodeProperties(value) + '}'
			}
		} else {
			return JSON.stringify(value)
		}
	}

	static parse(str)
	{

	}

	static encodeProperties(obj)
	{
		return Object.keys(obj).map(prop => {
			return '"'+prop+'":'+TSON.stringify(obj[prop])
		}).join(',')
	}

	static encodeEntries(arr)
	{
		return arr.map(value => {
			return TSON.stringify(value)
		}).join(',')
	}
}