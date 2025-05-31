# xprikryl-vp-detail-editor



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type     | Default     |
| ----------- | ------------ | ----------- | -------- | ----------- |
| `apiBase`   | `api-base`   |             | `string` | `undefined` |
| `patientId` | `patient-id` |             | `string` | `undefined` |
| `userRole`  | `user-role`  |             | `string` | `undefined` |


## Events

| Event             | Description | Type                |
| ----------------- | ----------- | ------------------- |
| `patient-deleted` |             | `CustomEvent<void>` |
| `patient-updated` |             | `CustomEvent<any>`  |


## Dependencies

### Used by

 - [xprikryl-vp-manager](../xprikryl-vp-manager)

### Graph
```mermaid
graph TD;
  xprikryl-vp-manager --> xprikryl-vp-detail-editor
  style xprikryl-vp-detail-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
