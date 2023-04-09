import React from 'react'
import type { TsInfo as TsInfoData } from 'vite-plugin-react-pages/clientTypes'

import s from './index.module.css'

interface Props {
  data: TsInfoData
}

export function TsInfo({ data }: Props) {
  if (data.type === 'interface' || data.type === 'object-literal') {
    return (
      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default Value</th>
          </tr>
        </thead>
        <tbody>
          {data.properties.map((row) => {
            const type = row.type.trim()
            const defaultValue = (() => {
              if (row.defaultValue) return <code>{row.defaultValue}</code>
              if (row.optional) return ''
              return (
                <span>
                  Required<span style={{ color: 'red' }}>*</span>
                </span>
              )
            })()
            return (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{type && <code>{type}</code>}</td>
                <td>{defaultValue}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  if (data.type === 'other') {
    return (
      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>
              <pre>{data.text}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <pre>{`TsInfo Error: <TsInfo> component receives invalid props.
If you use it in jsx, you should import tsInfo like "import * as tsInfo from './path/to/type.ts?tsInfo=InterfaceName'" and render it like "<TsInfo {...tsInfo}>"
If you use it in markdown, you should use it exactly like "<TsInfo src="./path/to/type.ts" name="ButtonProps" />" (we use simple regexp to parse it, so you should use this format strictly)
`}</pre>
  )
}
