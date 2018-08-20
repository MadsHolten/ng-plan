[demo](https://madsholten.github.io/ng-plan/)

### Ng-Plan

This module will draw a 2D plan drawing from a geoJSON object. It was built to visualize 2D space boundaries from the Building Information Modeling (BIM) authring tool, Revit. It is quite generic, but does have some features that are mainly related to the work done by the W3C Linked Building Data ([LBD](https://www.w3.org/community/lbd/)) Community Group.

The implementation I personally use is the following:

1) Export [BOT](w3id.org/bot) triples from Revit using [Revit-bot-exporter](https://github.com/MadsHolten/revit-bot-exporter)
2) Export 2D space boundaries to WKT polygons using Dynamo script
3) Merge WKT polygons and relevant information to geoJSON using the [wellknown](https://www.npmjs.com/package/wellknown) library
4) Send resulting geoJSON object to Ng-Plan for visualization

![alt text](https://github.com/MadsHolten/ng-plan/raw/master/src/assets/screenshot.PNG "Plan example")

#### Install to Angular project
Install package
`npm i ng-plan --save`

Add to app.module.ts
```
import { PlanModule } from 'ng-plan';

@NgModule({
  imports: [
    ...,
    PlanModule
  ]
})
```

Now Ng-plan can be used anywhere using the <ng-plan> tag.
```
<ng-plan [data]="data">
</ng-plan>
```
where *data* is the geoJSON data.

The Ng-plan toolbar uses material icons, so the following must be added to index.html for the toolbar to display correctly:
`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`

| Type  | Attribute             | Description                                   | Required |
| ----- | --------------------- | --------------------------------------------- | :------: |
| Input | data                  | geoJSON object                                | x        |
| Input | toolbar               | Display toolbar? Defaults to false            |          |
| Input | centroids             | Display centroids? Defaults to false          |          |
| Input | colors                | Array of key/val with {uri: "", color: ""}. Colors will also be read from the geoJSON color property. Defaults to #eee.    |          |
| Output| clickedRoom           | Fired on room click. Returns the URI of the clicked room and the absolute coordinates based on the original geoJSON.||
| Output| clickedCanvas         | Fired on canvas click. Use to clear selection or whatever. ||

*Styling*
| Attribute        | Description                                                                    | Default |
| defaultColor     | What fill color should be used for rooms where no color is explicitly defined? | #f2flec |
| selectedColor    | What fill color should be used for selected rooms?                             | #ebefe4 |

#### Functionality
- Zoom in/out using scroll wheel
- Zoom in/out using up/down
- Button for zoom extents
- Displays property "name" as label
- Displays property "description" as sub-label
- Appends color based on "color" property
- Event for clicking either canvas or room
- Retrieve coordinates when clicking room

#### Issues / changes
- Custom icon for zoom extents not working

#### Future
- Add support for lines + click lines
