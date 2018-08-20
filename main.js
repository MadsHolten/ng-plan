(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/ng-mesh-viewer/fesm5/ng-mesh-viewer.js":
/*!*****************************************************!*\
  !*** ./dist/ng-mesh-viewer/fesm5/ng-mesh-viewer.js ***!
  \*****************************************************/
/*! exports provided: NgMeshViewerService, NgMeshViewerComponent, MeshViewerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgMeshViewerService", function() { return NgMeshViewerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgMeshViewerComponent", function() { return NgMeshViewerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeshViewerModule", function() { return MeshViewerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_obj_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three-obj-loader */ "./node_modules/three-obj-loader/dist/index.js");
/* harmony import */ var three_obj_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(three_obj_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _avatsaev_three_orbitcontrols_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @avatsaev/three-orbitcontrols-ts */ "./node_modules/@avatsaev/three-orbitcontrols-ts/dist/index.js");
/* harmony import */ var _avatsaev_three_orbitcontrols_ts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_avatsaev_three_orbitcontrols_ts__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-scale-chromatic */ "./node_modules/d3-scale-chromatic/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgMeshViewerService = /** @class */ (function () {
    function NgMeshViewerService() {
        this.calculateScaleFactor = function (boundingBox, maxDim) {
            return new Promise(function (resolve, reject) {
                /** @type {?} */
                var size = new three__WEBPACK_IMPORTED_MODULE_2__["Vector3"]();
                boundingBox.getSize(size);
                /** @type {?} */
                var arr = [];
                size.toArray(arr);
                /** @type {?} */
                var largest = Math.max.apply(Math, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(arr));
                /** @type {?} */
                var scaleFactor = maxDim / largest;
                resolve(scaleFactor);
            });
        };
        this.calculateOffsetFactors = function (boundingBox, scaleFactor, maxDim) {
            return new Promise(function (resolve, reject) {
                /** @type {?} */
                var centroid = new three__WEBPACK_IMPORTED_MODULE_2__["Vector3"]();
                boundingBox.getCenter(centroid);
                /** @type {?} */
                var arr = [];
                centroid.toArray(arr);
                arr = arr.map(function (n) { return n * scaleFactor; });
                /** @type {?} */
                var offsetX = maxDim / 2 - arr[0];
                /** @type {?} */
                var offsetY = maxDim / 2 - arr[1];
                /** @type {?} */
                var offsetZ = maxDim / 2 - arr[2];
                resolve([offsetX, offsetY, offsetZ]);
            });
        };
        this.getBoundingBox = function (data) {
            return new Promise(function (resolve, reject) {
                /** @type {?} */
                var color = new three__WEBPACK_IMPORTED_MODULE_2__["Color"]("#000000");
                /** @type {?} */
                var mat = new three__WEBPACK_IMPORTED_MODULE_2__["PointsMaterial"]({ size: 2, color: color });
                /** @type {?} */
                var boundingBox = new three__WEBPACK_IMPORTED_MODULE_2__["Box3"]();
                data.forEach(function (el) {
                    if (el.geometry) {
                        /** @type {?} */
                        var objLines = el.geometry.split('\n');
                        /** @type {?} */
                        var verticesArr = objLines.filter(function (l) { return l.startsWith('v '); });
                        verticesArr.forEach(function (v) {
                            // split string ['v', 'xCoordinate', 'yCoordinate', 'zCoordinate']
                            v = v.split(' ');
                            /** @type {?} */
                            var a = new three__WEBPACK_IMPORTED_MODULE_2__["Vector3"](v[1], v[2], v[3]);
                            /** @type {?} */
                            var geo = new three__WEBPACK_IMPORTED_MODULE_2__["Geometry"]();
                            geo.vertices.push(a);
                            /** @type {?} */
                            var point = new three__WEBPACK_IMPORTED_MODULE_2__["Points"](geo, mat);
                            boundingBox.expandByObject(point);
                        });
                    }
                });
                resolve(boundingBox);
            });
        };
    }
    /**
     * @param {?} data
     * @return {?}
     */
    NgMeshViewerService.prototype.processOBJ = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var maxDim, boundingBox, scaleFactor, offset, newData, geometryPreprocessing;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxDim = 1;
                        return [4 /*yield*/, this.getBoundingBox(data)];
                    case 1:
                        boundingBox = _a.sent();
                        return [4 /*yield*/, this.calculateScaleFactor(boundingBox, maxDim)];
                    case 2:
                        scaleFactor = _a.sent();
                        return [4 /*yield*/, this.calculateOffsetFactors(boundingBox, scaleFactor, maxDim)];
                    case 3:
                        offset = _a.sent();
                        newData = data.map(function (el) {
                            /** @type {?} */
                            var objLines = el.geometry.split('\n');
                            /** @type {?} */
                            var objLinesNew = objLines.map(function (l) {
                                // Scale and offset vertices
                                if (l.startsWith('v ')) {
                                    /** @type {?} */
                                    var v = l.split(' ');
                                    /** @type {?} */
                                    var x = v[1] * scaleFactor + offset[0];
                                    /** @type {?} */
                                    var y = v[2] * scaleFactor + offset[1];
                                    /** @type {?} */
                                    var z = v[3] * scaleFactor + offset[2];
                                    // Create new vertice in OBJ syntax
                                    l = "v " + x + " " + y + " " + z;
                                }
                                return l;
                            });
                            /** @type {?} */
                            var geometryNew = objLinesNew.join('\n');
                            el.geometry = geometryNew;
                            return el;
                        });
                        geometryPreprocessing = {
                            scaleFactor: scaleFactor,
                            offset: offset
                        };
                        return [2 /*return*/, { zones: newData, geometryPreprocessing: geometryPreprocessing }];
                }
            });
        });
    };
    NgMeshViewerService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgMeshViewerService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgMeshViewerService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function NgMeshViewerService_Factory() { return new NgMeshViewerService(); }, token: NgMeshViewerService, providedIn: "root" });
    return NgMeshViewerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
three_obj_loader__WEBPACK_IMPORTED_MODULE_3___default()(three__WEBPACK_IMPORTED_MODULE_2__);
var NgMeshViewerComponent = /** @class */ (function () {
    function NgMeshViewerComponent(_s) {
        this._s = _s;
        this.clickedRoom = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.clickedCanvas = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.showCentroids = true;
        this.showBoundingBox = true;
        this.centroid = new three__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0.5, 0.5, 0.5);
        this.highlightMaterial = new three__WEBPACK_IMPORTED_MODULE_2__["MeshBasicMaterial"]({ color: 0x7c0a02, opacity: 1 });
        this.hoverMaterial = new three__WEBPACK_IMPORTED_MODULE_2__["MeshBasicMaterial"]({ color: 0x000000, opacity: 0.2 });
        this.canvasClass = 'default';
        this.render = this.render.bind(this);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgMeshViewerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (Array.isArray(changes["data"].currentValue)) {
            this.createScene();
            /** @type {?} */
            var processed = this._s.processOBJ(this.data).then(function (res) {
                _this.spaces = res.zones;
                console.log(_this.spaces);
                _this.appendMeshes(_this.spaces);
            });
            this.createRenderer();
            this.createCamera();
            this.createControls();
            this.render();
        }
    };
    /**
     * @return {?}
     */
    NgMeshViewerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    NgMeshViewerComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        this.renderer.render(this.scene, this.camera);
    };
    /**
     * @return {?}
     */
    NgMeshViewerComponent.prototype.createScene = /**
     * @return {?}
     */
    function () {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__["Scene"]();
        /** @type {?} */
        var ambient = new three__WEBPACK_IMPORTED_MODULE_2__["AmbientLight"](0x101030);
        this.scene.add(ambient);
        /** @type {?} */
        var light = new three__WEBPACK_IMPORTED_MODULE_2__["PointLight"](0xffffff, 1, 1000);
        light.position.set(0, 0, 1);
        this.scene.add(light);
        /** @type {?} */
        var light = new three__WEBPACK_IMPORTED_MODULE_2__["PointLight"](0xffffff, 1, 1000);
        light.position.set(0, 1, 1);
        this.scene.add(light);
        return this.scene;
    };
    /**
     * @return {?}
     */
    NgMeshViewerComponent.prototype.createRenderer = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canvas = this.canvasRef.nativeElement;
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"]({ canvas: canvas, antialias: true, alpha: true });
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        return this.renderer;
    };
    /**
     * @param {?} spaces
     * @return {?}
     */
    NgMeshViewerComponent.prototype.appendMeshes = /**
     * @param {?} spaces
     * @return {?}
     */
    function (spaces) {
        /** @type {?} */
        var objLoader = new three__WEBPACK_IMPORTED_MODULE_2__["OBJLoader"]();
        /** @type {?} */
        var colorScheme = d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_5__["schemeCategory10"];
        // Convert to array if only single space received
        if (!Array.isArray(spaces))
            spaces = [spaces];
        try {
            for (var spaces_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(spaces), spaces_1_1 = spaces_1.next(); !spaces_1_1.done; spaces_1_1 = spaces_1.next()) {
                var space = spaces_1_1.value;
                /** @type {?} */
                var myObj = objLoader.parse(space.geometry);
                /** @type {?} */
                var randInt = Math.floor(Math.random() * 10);
                /** @type {?} */
                var color = new three__WEBPACK_IMPORTED_MODULE_2__["Color"](colorScheme[randInt]);
                /** @type {?} */
                var material = new three__WEBPACK_IMPORTED_MODULE_2__["MeshBasicMaterial"]({ color: color, side: three__WEBPACK_IMPORTED_MODULE_2__["DoubleSide"], opacity: 0.5, transparent: true, depthWrite: false });
                myObj.name = space.uri;
                /** @type {?} */
                var invalidPos;
                myObj.traverse(function (child) {
                    if (child instanceof three__WEBPACK_IMPORTED_MODULE_2__["Mesh"]) {
                        child.name = space.uri;
                        child.material = material;
                        /** @type {?} */
                        var x = child.geometry.clone();
                        invalidPos = x.attributes.position.array.includes(NaN);
                    }
                });
                // Add if not position includes NaN value(s)
                if (!invalidPos) {
                    this.scene.add(myObj);
                    if (this.showCentroids) {
                        /** @type {?} */
                        var bbox = new three__WEBPACK_IMPORTED_MODULE_2__["Box3"]().setFromObject(myObj);
                        /** @type {?} */
                        var ct = new three__WEBPACK_IMPORTED_MODULE_2__["Vector3"]();
                        bbox.getCenter(ct);
                        /** @type {?} */
                        var geo = new three__WEBPACK_IMPORTED_MODULE_2__["Geometry"]();
                        geo.vertices.push(ct);
                        /** @type {?} */
                        var color = new three__WEBPACK_IMPORTED_MODULE_2__["Color"]("#000000");
                        /** @type {?} */
                        var mat = new three__WEBPACK_IMPORTED_MODULE_2__["PointsMaterial"]({ size: 2, sizeAttenuation: false, color: color });
                        /** @type {?} */
                        var centroid = new three__WEBPACK_IMPORTED_MODULE_2__["Points"](geo, mat);
                        this.scene.add(centroid);
                    }
                }
                else {
                    console.log("Space " + space.uri + " has invalid position attributes.");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (spaces_1_1 && !spaces_1_1.done && (_a = spaces_1.return)) _a.call(spaces_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return;
        var e_1, _a;
    };
    /**
     * @return {?}
     */
    NgMeshViewerComponent.prototype.createCamera = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var aspectRatio = this.getAspectRatio();
        /** @type {?} */
        var fov = 75;
        /** @type {?} */
        var near = 0.1;
        /** @type {?} */
        var far = 1000; // far plane
        this.camera = new three__WEBPACK_IMPORTED_MODULE_2__["PerspectiveCamera"](fov, aspectRatio, near, far);
        this.camera.up.set(0, 0, 1); // z-axis up
        this.camera.lookAt(this.centroid);
        this.camera.position.set(1.1, 0.5, 1.1);
        // fov = 2 * Math.atan( height / ( 2 * dist ) ) * ( 180 / Math.PI );
        this.camera.fov = 2 * Math.atan(1 / (2 * 0.25)) * (180 / Math.PI);
        return this.camera;
    };
    /**
     * @return {?}
     */
    NgMeshViewerComponent.prototype.createControls = /**
     * @return {?}
     */
    function () {
        this.controls = new _avatsaev_three_orbitcontrols_ts__WEBPACK_IMPORTED_MODULE_4__["OrbitControls"](this.camera, this.renderer.domElement);
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minDistance = 0;
        this.controls.maxDistance = 10;
        // set camera to rotate around center of loaded object
        this.controls.target = this.centroid;
        this.controls.addEventListener('change', this.render);
        return this.controls;
    };
    /**
     * @return {?}
     */
    NgMeshViewerComponent.prototype.getAspectRatio = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canvas = this.canvasRef.nativeElement;
        /** @type {?} */
        var height = canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return canvas.clientWidth / canvas.clientHeight;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgMeshViewerComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        // Unselect previously selected object
        if (this.selected) {
            this.selected.material = this.previousMaterial;
            this.selected = null;
        }
        /** @type {?} */
        var mouse = new three__WEBPACK_IMPORTED_MODULE_2__["Vector2"]();
        mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        /** @type {?} */
        var obj = this.intersectingMesh(mouse);
        // Change color
        if (obj) {
            // Store
            this.selected = obj;
            this.previousMaterial = obj.material;
            // Set new material
            obj.material = this.highlightMaterial;
            // Emit output
            this.clickedRoom.emit({ uri: obj.name });
        }
        this.render();
        return;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgMeshViewerComponent.prototype.onMouseMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (!this.renderer)
            return;
        /** @type {?} */
        var mouse = new three__WEBPACK_IMPORTED_MODULE_2__["Vector2"]();
        mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        /** @type {?} */
        var obj = this.intersectingMesh(mouse);
        if (obj) {
            // Save material for later if hover just initiated
            if (obj != this.previousHovered) {
                this.canvasClass = "clickable";
                // // Restore material for previously hovered
                // if(this.previousHovered){
                //   this.previousHovered.material = this.previousMaterial;
                // }
                // Set current object to previously hovered
                this.previousHovered = obj;
                // this.previousMaterial = obj.material;
                // // Set hover material on object (if not selected)
                // if(obj != this.selected){
                //   obj.material = this.hoverMaterial;
                // }
            }
        }
        else {
            if (this.previousHovered) {
                this.canvasClass = "default";
                // if(this.previousHovered != this.selected){
                //   // Restore material for previously hovered and set previously hovered to null
                //   this.previousHovered.material = this.previousMaterial;
                // }
                this.previousHovered = null;
            }
        }
        this.render();
        return;
    };
    /**
     * @param {?} pred
     * @param {?} parent
     * @return {?}
     */
    NgMeshViewerComponent.prototype.findAllObjects = /**
     * @param {?} pred
     * @param {?} parent
     * @return {?}
     */
    function (pred, parent) {
        var _this = this;
        // NOTE: Better to keep separate array of selected objects
        if (parent.children.length > 0) {
            parent.children.forEach(function (i) {
                pred.push(i);
                _this.findAllObjects(pred, i);
            });
        }
        return;
    };
    /**
     * @param {?} mouse
     * @return {?}
     */
    NgMeshViewerComponent.prototype.intersectingMesh = /**
     * @param {?} mouse
     * @return {?}
     */
    function (mouse) {
        /** @type {?} */
        var obj = [];
        this.findAllObjects(obj, this.scene);
        /** @type {?} */
        var raycaster = new three__WEBPACK_IMPORTED_MODULE_2__["Raycaster"]();
        raycaster.setFromCamera(mouse, this.camera);
        /** @type {?} */
        var intersects = raycaster.intersectObjects(obj);
        if (intersects) {
            /** @type {?} */
            var a = intersects.filter(function (x) { return x.object.type == "Mesh"; })[0];
            if (a)
                return a.object;
        }
        return null;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgMeshViewerComponent.prototype.onMouseUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log("onMouseUp");
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgMeshViewerComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.canvasRef.nativeElement.style.width = "100%";
        this.canvasRef.nativeElement.style.height = "100%";
        console.log("onResize: " + this.canvasRef.nativeElement.clientWidth + ", " + this.canvasRef.nativeElement.clientHeight);
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);
        this.render();
        return;
    };
    NgMeshViewerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ng-mesh-viewer',
                    template: "<canvas \n    [ngClass] = \"canvasClass\"\n    #canvas \n    (mousemove)=\"onMouseMove($event)\"\n    (mousedown)=\"onMouseDown($event)\"\n    (mouseup)=\"onMouseUp($event)\">\n</canvas>",
                    styles: ["canvas{width:100%;height:100%}.button-row{position:absolute;z-index:100;float:right}.clickable{cursor:pointer}.default{cursor:default}"],
                    providers: [NgMeshViewerService]
                },] },
    ];
    /** @nocollapse */
    NgMeshViewerComponent.ctorParameters = function () { return [
        { type: NgMeshViewerService }
    ]; };
    NgMeshViewerComponent.propDecorators = {
        clickedRoom: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        clickedCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        data: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showCentroids: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showBoundingBox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        canvasRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['canvas',] }],
        onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['window:resize', ['$event'],] }]
    };
    return NgMeshViewerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MeshViewerModule = /** @class */ (function () {
    function MeshViewerModule() {
    }
    MeshViewerModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"]
                    ],
                    declarations: [NgMeshViewerComponent],
                    exports: [NgMeshViewerComponent]
                },] },
    ];
    return MeshViewerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWVzaC12aWV3ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLW1lc2gtdmlld2VyL2xpYi9uZy1tZXNoLXZpZXdlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1tZXNoLXZpZXdlci9saWIvbmctbWVzaC12aWV3ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tZXNoLXZpZXdlci9saWIvbmctbWVzaC12aWV3ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGludGVyZmFjZSBPQkpHZW9tZXRyeSB7XG4gICAgem9uZXM/OiBzdHJpbmdbXSxcbiAgICBlbGVtZW50cz86IHN0cmluZ1tdLFxuICAgIGdlb21ldHJ5UHJlcHJvY2Vzc2luZzogR2VvbVByZVByb2Nlc3Ncbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW9tUHJlUHJvY2VzcyB7XG4gICAgc2NhbGVGYWN0b3I6IG51bWJlcixcbiAgICBvZmZzZXQ6IG51bWJlcltdXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nTWVzaFZpZXdlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIGFzeW5jIHByb2Nlc3NPQkooZGF0YSk6IFByb21pc2U8T0JKR2VvbWV0cnk+IHtcbiAgIFxuICAgICAgLy8gRGVzaXJlZCBtYXggZGltZW5zaW9uIChtYXggd2lkdGgsIGhlaWdodCBvciBkZXB0aClcbiAgICAgIHZhciBtYXhEaW0gPSAxO1xuXG4gICAgICAvLyBHZXQgYm91bmRpbmcgYm94IG9mIGFsbCBnZW9tZXRyeSByZWNlaXZlZFxuICAgICAgdmFyIGJvdW5kaW5nQm94ID0gYXdhaXQgdGhpcy5nZXRCb3VuZGluZ0JveChkYXRhKTtcblxuICAgICAgdmFyIHNjYWxlRmFjdG9yID0gYXdhaXQgdGhpcy5jYWxjdWxhdGVTY2FsZUZhY3Rvcihib3VuZGluZ0JveCwgbWF4RGltKTtcblxuICAgICAgdmFyIG9mZnNldCA9IGF3YWl0IHRoaXMuY2FsY3VsYXRlT2Zmc2V0RmFjdG9ycyhib3VuZGluZ0JveCwgc2NhbGVGYWN0b3IsIG1heERpbSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogU0NBTEUgQU5EIE9GRlNFVCBPUklHSU5BTFxuICAgICAgICovXG4gICAgICB2YXIgbmV3RGF0YTogc3RyaW5nW10gPSBkYXRhLm1hcChlbCA9PiB7XG5cbiAgICAgICAgICB2YXIgb2JqTGluZXMgPSBlbC5nZW9tZXRyeS5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgICAvLyBMb29wIG92ZXIgbGluZXMgaW4gT0JKIGZpbGVcbiAgICAgICAgICB2YXIgb2JqTGluZXNOZXcgPSBvYmpMaW5lcy5tYXAobCA9PiB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBTY2FsZSBhbmQgb2Zmc2V0IHZlcnRpY2VzXG4gICAgICAgICAgICAgIGlmKGwuc3RhcnRzV2l0aCgndiAnKSl7XG5cbiAgICAgICAgICAgICAgICAgIC8vIHNwbGl0IHN0cmluZyBbJ3YnLCAneENvb3JkaW5hdGUnLCAneUNvb3JkaW5hdGUnLCAnekNvb3JkaW5hdGUnXVxuICAgICAgICAgICAgICAgICAgdmFyIHYgPSBsLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIE1vdmUgYW5kIHNjYWxlXG4gICAgICAgICAgICAgICAgICB2YXIgeCA9IHZbMV0qc2NhbGVGYWN0b3IgKyBvZmZzZXRbMF07XG4gICAgICAgICAgICAgICAgICB2YXIgeSA9IHZbMl0qc2NhbGVGYWN0b3IgKyBvZmZzZXRbMV07XG4gICAgICAgICAgICAgICAgICB2YXIgeiA9IHZbM10qc2NhbGVGYWN0b3IgKyBvZmZzZXRbMl07XG5cbiAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgdmVydGljZSBpbiBPQkogc3ludGF4XG4gICAgICAgICAgICAgICAgICBsID0gYHYgJHt4fSAke3l9ICR7en1gO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGw7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgZ2VvbWV0cnlOZXcgPSBvYmpMaW5lc05ldy5qb2luKCdcXG4nKTtcbiAgICAgICAgICBlbC5nZW9tZXRyeSA9IGdlb21ldHJ5TmV3O1xuXG4gICAgICAgICAgcmV0dXJuIGVsO1xuXG4gICAgICB9KTtcblxuICAgICAgLy8gQXBwZW5kIHByZS1wcm9jZXNzaW5nIGRhdGEgdG8gYXJyYXlcbiAgICAgIHZhciBnZW9tZXRyeVByZXByb2Nlc3NpbmcgPSB7XG4gICAgICAgICAgc2NhbGVGYWN0b3I6IHNjYWxlRmFjdG9yLFxuICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7em9uZXM6IG5ld0RhdGEsIGdlb21ldHJ5UHJlcHJvY2Vzc2luZzogZ2VvbWV0cnlQcmVwcm9jZXNzaW5nfTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVTY2FsZUZhY3RvciA9IChib3VuZGluZ0JveCwgbWF4RGltKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBHZXQgYm94IHNpemVcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBib3VuZGluZ0JveC5nZXRTaXplKHNpemUpO1xuXG4gICAgICAgIC8vIEdldCBsYXJnZXN0IGRpbWVuc2lvblxuICAgICAgICB2YXIgYXJyOiBudW1iZXJbXSA9IFtdXG4gICAgICAgIHNpemUudG9BcnJheShhcnIpO1xuICAgICAgICB2YXIgbGFyZ2VzdCA9IE1hdGgubWF4KC4uLmFycik7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHNjYWxlLWZhY3RvclxuICAgICAgICB2YXIgc2NhbGVGYWN0b3IgPSBtYXhEaW0vbGFyZ2VzdDtcblxuICAgICAgICByZXNvbHZlKHNjYWxlRmFjdG9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlT2Zmc2V0RmFjdG9ycyA9IChib3VuZGluZ0JveCxzY2FsZUZhY3RvcixtYXhEaW0pOiBQcm9taXNlPG51bWJlcltdPiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gR2V0IGNlbnRyb2lkXG4gICAgICAgIHZhciBjZW50cm9pZCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIGJvdW5kaW5nQm94LmdldENlbnRlcihjZW50cm9pZCk7XG5cbiAgICAgICAgLy8gU2NhbGUgY2VudHJvaWRcbiAgICAgICAgdmFyIGFycjogbnVtYmVyW10gPSBbXVxuICAgICAgICBjZW50cm9pZC50b0FycmF5KGFycik7XG4gICAgICAgIGFyciA9IGFyci5tYXAobiA9PiBuKnNjYWxlRmFjdG9yKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgb2Zmc2V0XG4gICAgICAgIHZhciBvZmZzZXRYID0gbWF4RGltLzIgLSBhcnJbMF07XG4gICAgICAgIHZhciBvZmZzZXRZID0gbWF4RGltLzIgLSBhcnJbMV07XG4gICAgICAgIHZhciBvZmZzZXRaID0gbWF4RGltLzIgLSBhcnJbMl07XG5cbiAgICAgICAgcmVzb2x2ZShbb2Zmc2V0WCwgb2Zmc2V0WSwgb2Zmc2V0Wl0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCb3VuZGluZ0JveCA9IChkYXRhKTogUHJvbWlzZTxUSFJFRS5Cb3gzPiA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IG1hdGVyaWFsIGZvciBwb2ludHNcbiAgICAgICAgdmFyIGNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCBcIiMwMDAwMDBcIiApO1xuICAgICAgICB2YXIgbWF0ID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKCB7IHNpemU6IDIsIGNvbG9yOiBjb2xvciB9ICk7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgYm91bmRpbmcgYm94XG4gICAgICAgIHZhciBib3VuZGluZ0JveCA9IG5ldyBUSFJFRS5Cb3gzKCk7XG5cbiAgICAgICAgZGF0YS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmKGVsLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIG9iakxpbmVzID0gZWwuZ2VvbWV0cnkuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgICAgIHZhciB2ZXJ0aWNlc0FyciA9IG9iakxpbmVzLmZpbHRlcihsID0+IGwuc3RhcnRzV2l0aCgndiAnKSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXNBcnIuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3BsaXQgc3RyaW5nIFsndicsICd4Q29vcmRpbmF0ZScsICd5Q29vcmRpbmF0ZScsICd6Q29vcmRpbmF0ZSddXG4gICAgICAgICAgICAgICAgICAgIHYgPSB2LnNwbGl0KCcgJyk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIERlZmluZSB2ZXJ0aWNlXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gbmV3IFRIUkVFLlZlY3RvcjMoIHZbMV0sIHZbMl0sIHZbM10gKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRvIGJvdW5kaW5nIGJveFxuICAgICAgICAgICAgICAgICAgICB2YXIgZ2VvID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIGdlby52ZXJ0aWNlcy5wdXNoKGEpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBuZXcgVEhSRUUuUG9pbnRzKCBnZW8sIG1hdCApO1xuICAgICAgICAgICAgICAgICAgICBib3VuZGluZ0JveC5leHBhbmRCeU9iamVjdChwb2ludCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmUoYm91bmRpbmdCb3gpO1xuXG4gICAgICB9KTtcbiAgfTtcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIFNpbXBsZUNoYW5nZXMsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCBPQkpMb2FkZXIgZnJvbSAndGhyZWUtb2JqLWxvYWRlcic7XG5PQkpMb2FkZXIoVEhSRUUpO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ0BhdmF0c2Fldi90aHJlZS1vcmJpdGNvbnRyb2xzLXRzJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzLXNjYWxlLWNocm9tYXRpYyc7XG5cbmltcG9ydCB7IE5nTWVzaFZpZXdlclNlcnZpY2UgfSBmcm9tICcuL25nLW1lc2gtdmlld2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBPQkpHZW9tZXRyeSB9IGZyb20gJy4vbmctbWVzaC12aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLW1lc2gtdmlld2VyJyxcbiAgdGVtcGxhdGU6IGA8Y2FudmFzIFxyXG4gICAgW25nQ2xhc3NdID0gXCJjYW52YXNDbGFzc1wiXHJcbiAgICAjY2FudmFzIFxyXG4gICAgKG1vdXNlbW92ZSk9XCJvbk1vdXNlTW92ZSgkZXZlbnQpXCJcclxuICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiXHJcbiAgICAobW91c2V1cCk9XCJvbk1vdXNlVXAoJGV2ZW50KVwiPlxyXG48L2NhbnZhcz5gLFxuICBzdHlsZXM6IFtgY2FudmFze3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LmJ1dHRvbi1yb3d7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDA7ZmxvYXQ6cmlnaHR9LmNsaWNrYWJsZXtjdXJzb3I6cG9pbnRlcn0uZGVmYXVsdHtjdXJzb3I6ZGVmYXVsdH1gXSxcbiAgcHJvdmlkZXJzOiBbIE5nTWVzaFZpZXdlclNlcnZpY2UgXVxufSlcblxuZXhwb3J0IGNsYXNzIE5nTWVzaFZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQE91dHB1dCgpIGNsaWNrZWRSb29tID0gbmV3IEV2ZW50RW1pdHRlcigpOyAgICAgICAgICAgICAvLyBDbGlja2VkIHJvb21cbiAgQE91dHB1dCgpIGNsaWNrZWRDYW52YXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHNwYWNlcztcbiAgQElucHV0KCkgcHVibGljIGRhdGE7ICAgICAgICAgICAvL0pTT04gKyBvYmpcbiAgQElucHV0KCkgcHVibGljIHNob3dDZW50cm9pZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0JvdW5kaW5nQm94OiBib29sZWFuID0gdHJ1ZTtcblxuICAvLyBUSFJFRSBKU1xuICBwdWJsaWMgc2NlbmU6IFRIUkVFLlNjZW5lO1xuICBwdWJsaWMgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgcHVibGljIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICBwdWJsaWMgY29udHJvbHM7XG5cbiAgLy8gR0VPTUVUUllcbiAgcHVibGljIGJvdW5kaW5nQm94OiBUSFJFRS5Cb3gzOyAvLyBWb3VuZGluZyBib3ggb2YgZnVsbCBnZW9tZXRyeVxuICBwdWJsaWMgY2VudHJvaWQ6IFRIUkVFLlZlY3RvcjMgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjUsMC41LDAuNSk7OyAvLyBDZW50cm9pZCBvZiBmdWxsIGdlb21ldHJ5XG4gIHB1YmxpYyBzaXplOiBUSFJFRS5WZWN0b3IzOyAgICAgLy8gU2l6ZSBvZiBmdWxsIGdlb21ldHJ5XG5cbiAgcHVibGljIGhpZ2hsaWdodE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDdjMGEwMiwgb3BhY2l0eTogMSB9ICk7XG4gIHB1YmxpYyBob3Zlck1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDAwMDAwMCwgb3BhY2l0eTogMC4yIH0gKTtcblxuICAvLyBTRUxFQ1RJT05cbiAgcHVibGljIHNlbGVjdGVkOyAgICAgICAgICAgICAgICAvLyBTdG9yZXMgdGhlIHNlbGVjdGVkIG9iamVjdFxuICBwdWJsaWMgcHJldmlvdXNNYXRlcmlhbDsgICAgICAgIC8vIFN0b3JlcyB0aGUgY29sb3Igb2YgdGhlIG9iamVjdCB3aGljaCB3YXMgcHJldmlvdXNseSBzZWxlY3RlZC9ob3ZlcmVkXG4gIHB1YmxpYyBwcmV2aW91c0hvdmVyZWQ7ICAgICAgICAgLy8gU3RvcmVzIHRoZSBvYmplY3Qgd2hpY2ggd2FzIHByZXZpb3VzbHkgaG92ZXJlZFxuICBcbiAgcHVibGljIGNhbnZhc0NsYXNzOiBzdHJpbmcgPSAnZGVmYXVsdCc7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJylcbiAgcHJpdmF0ZSBjYW52YXNSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoIHByaXZhdGUgX3M6IE5nTWVzaFZpZXdlclNlcnZpY2UgKSB7XG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgaWYoQXJyYXkuaXNBcnJheShjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKSl7XG5cbiAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcblxuICAgICAgLy8gUGVyZm9ybSBnZW9tZXRyeSBwcmVwcm9jZXNzaW5nXG4gICAgICAvLyBTY2FsZXMgYW5kIG9mZnNldHMgZ2VvbWV0cnkgdG8gZml0IChbMCwwLDBdLCBbMSwxLDFdKSBzY2VuZVxuICAgICAgdmFyIHByb2Nlc3NlZCA9IHRoaXMuX3MucHJvY2Vzc09CSih0aGlzLmRhdGEpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5zcGFjZXMgPSByZXMuem9uZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3BhY2VzKTtcbiAgICAgICAgdGhpcy5hcHBlbmRNZXNoZXModGhpcy5zcGFjZXMpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcbiAgICAgIHRoaXMuY3JlYXRlQ2FtZXJhKCk7XG4gICAgICB0aGlzLmNyZWF0ZUNvbnRyb2xzKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIFxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVNjZW5lKCk6IFRIUkVFLlNjZW5lIHtcbiAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgdmFyIGFtYmllbnQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KCAweDEwMTAzMCApO1xuICAgICAgdGhpcy5zY2VuZS5hZGQoIGFtYmllbnQgKTtcblxuICAgICAgdmFyIGxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYsIDEsIDEwMDApO1xuICAgICAgbGlnaHQucG9zaXRpb24uc2V0KDAsIDAsIDEpO1xuICAgICAgdGhpcy5zY2VuZS5hZGQobGlnaHQpO1xuXG4gICAgICB2YXIgbGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgMSwgMTAwMCk7XG4gICAgICBsaWdodC5wb3NpdGlvbi5zZXQoMCwgMSwgMSk7XG4gICAgICB0aGlzLnNjZW5lLmFkZChsaWdodCk7XG5cbiAgICAgIHJldHVybiB0aGlzLnNjZW5lO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSZW5kZXJlcigpOiBUSFJFRS5XZWJHTFJlbmRlcmVyIHtcbiAgICB2YXIgY2FudmFzID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoIHsgY2FudmFzOiBjYW52YXMsIGFudGlhbGlhczogdHJ1ZSwgYWxwaGE6IHRydWUgfSApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHhmZmZmZmYsIDApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXI7XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZE1lc2hlcyhzcGFjZXMpOiB2b2lkIHtcblxuICAgIC8vIEFkZCBPQkogZ3JhcGhpY3NcbiAgICB2YXIgb2JqTG9hZGVyID0gbmV3IFRIUkVFLk9CSkxvYWRlcigpO1xuICAgIHZhciBjb2xvclNjaGVtZSA9IGQzLnNjaGVtZUNhdGVnb3J5MTA7XG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgc2luZ2xlIHNwYWNlIHJlY2VpdmVkXG4gICAgaWYoIUFycmF5LmlzQXJyYXkoc3BhY2VzKSkgc3BhY2VzID0gW3NwYWNlc107XG5cbiAgICBmb3IodmFyIHNwYWNlIG9mIHNwYWNlcyl7XG5cbiAgICAgIHZhciBteU9iaiA9IG9iakxvYWRlci5wYXJzZShzcGFjZS5nZW9tZXRyeSk7XG4gICAgICB2YXIgcmFuZEludCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHZhciBjb2xvciA9IG5ldyBUSFJFRS5Db2xvcihjb2xvclNjaGVtZVtyYW5kSW50XSk7XG5cbiAgICAgIC8vIERlZmluZSBtYXRlcmlhbFxuICAgICAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiBjb2xvciwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSwgb3BhY2l0eTogMC41LCB0cmFuc3BhcmVudDogdHJ1ZSwgZGVwdGhXcml0ZTogZmFsc2UgfSApO1xuXG4gICAgICBteU9iai5uYW1lID0gc3BhY2UudXJpO1xuXG4gICAgICB2YXIgaW52YWxpZFBvcztcbiAgICAgIG15T2JqLnRyYXZlcnNlKGNoaWxkID0+IHtcbiAgICAgICAgaWYgKCBjaGlsZCBpbnN0YW5jZW9mIFRIUkVFLk1lc2ggKSB7XG4gICAgICAgICAgY2hpbGQubmFtZSA9IHNwYWNlLnVyaTtcbiAgICAgICAgICBjaGlsZC5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG4gICAgICAgICAgLy8gR2V0IHBvc2l0aW9uIGF0dHJpYnV0ZVxuICAgICAgICAgIHZhciB4OiBhbnkgPSBjaGlsZC5nZW9tZXRyeS5jbG9uZSgpO1xuICAgICAgICAgIGludmFsaWRQb3MgPSB4LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXkuaW5jbHVkZXMoTmFOKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCBpZiBub3QgcG9zaXRpb24gaW5jbHVkZXMgTmFOIHZhbHVlKHMpXG4gICAgICBpZighaW52YWxpZFBvcyl7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG15T2JqKTtcbiAgICAgIFxuICAgICAgICBpZih0aGlzLnNob3dDZW50cm9pZHMpe1xuICAgICAgICAgIC8vIEdldCBjZW50cm9pZCBvZiBzcGFjZVxuICAgICAgICAgIHZhciBiYm94ID0gbmV3IFRIUkVFLkJveDMoKS5zZXRGcm9tT2JqZWN0KG15T2JqKVxuXG4gICAgICAgICAgdmFyIGN0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgICBiYm94LmdldENlbnRlcihjdCk7XG5cbiAgICAgICAgICAvLyBBZGQgY2VudHJvaWRcbiAgICAgICAgICB2YXIgZ2VvID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XG4gICAgICAgICAgZ2VvLnZlcnRpY2VzLnB1c2goY3QpO1xuICAgICAgICAgIHZhciBjb2xvciA9IG5ldyBUSFJFRS5Db2xvciggXCIjMDAwMDAwXCIgKTtcbiAgICAgICAgICB2YXIgbWF0ID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKCB7IHNpemU6IDIsIHNpemVBdHRlbnVhdGlvbjogZmFsc2UsIGNvbG9yOiBjb2xvciB9ICk7XG4gICAgICAgICAgdmFyIGNlbnRyb2lkID0gbmV3IFRIUkVFLlBvaW50cyggZ2VvLCBtYXQgKTtcbiAgICAgICAgICB0aGlzLnNjZW5lLmFkZChjZW50cm9pZCk7XG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNwYWNlIFwiICsgc3BhY2UudXJpICsgXCIgaGFzIGludmFsaWQgcG9zaXRpb24gYXR0cmlidXRlcy5cIilcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm47XG4gICAgXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNhbWVyYSgpOiBUSFJFRS5DYW1lcmEge1xuICAgIGxldCBhc3BlY3RSYXRpbyA9IHRoaXMuZ2V0QXNwZWN0UmF0aW8oKTtcbiAgICB2YXIgZm92ID0gNzU7ICAgLy8gdmVydGljYWwgZmllbGQgb2Ygdmlld1xuICAgIHZhciBuZWFyID0gMC4xOyAvLyBuZWFyIHBsYW5lXG4gICAgdmFyIGZhciA9IDEwMDA7ICAvLyBmYXIgcGxhbmVcblxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCBmb3YsIGFzcGVjdFJhdGlvLCBuZWFyLCBmYXIgKTtcbiAgICB0aGlzLmNhbWVyYS51cC5zZXQoMCwwLDEpOyAgICAvLyB6LWF4aXMgdXBcbiAgICB0aGlzLmNhbWVyYS5sb29rQXQoIHRoaXMuY2VudHJvaWQgKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5zZXQoMS4xLCAwLjUsIDEuMSk7XG5cbiAgICAvLyBmb3YgPSAyICogTWF0aC5hdGFuKCBoZWlnaHQgLyAoIDIgKiBkaXN0ICkgKSAqICggMTgwIC8gTWF0aC5QSSApO1xuICAgIHRoaXMuY2FtZXJhLmZvdiA9IDIgKiBNYXRoLmF0YW4oIDEgLyAoIDIgKiAwLjI1ICkgKSAqICggMTgwIC8gTWF0aC5QSSApO1xuXG4gICAgcmV0dXJuIHRoaXMuY2FtZXJhO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb250cm9scygpOiBUSFJFRS5PcmJpdENvbnRyb2xzIHtcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoIHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcbiAgICB0aGlzLmNvbnRyb2xzLm1pblBvbGFyQW5nbGUgPSAwO1xuICAgIHRoaXMuY29udHJvbHMubWF4UG9sYXJBbmdsZSA9IE1hdGguUEk7XG4gICAgdGhpcy5jb250cm9scy5taW5EaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5jb250cm9scy5tYXhEaXN0YW5jZSA9IDEwO1xuXG4gICAgLy8gc2V0IGNhbWVyYSB0byByb3RhdGUgYXJvdW5kIGNlbnRlciBvZiBsb2FkZWQgb2JqZWN0XG4gICAgdGhpcy5jb250cm9scy50YXJnZXQgPSB0aGlzLmNlbnRyb2lkO1xuXG4gICAgdGhpcy5jb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLnJlbmRlcik7XG5cbiAgICByZXR1cm4gdGhpcy5jb250cm9scztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcbiAgICAgIHZhciBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgbGV0IGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FudmFzLmNsaWVudFdpZHRoIC8gY2FudmFzLmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIC8qIEVWRU5UUyAqL1xuICBwdWJsaWMgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gVW5zZWxlY3QgcHJldmlvdXNseSBzZWxlY3RlZCBvYmplY3RcbiAgICBpZih0aGlzLnNlbGVjdGVkKXtcbiAgICAgIHRoaXMuc2VsZWN0ZWQubWF0ZXJpYWwgPSB0aGlzLnByZXZpb3VzTWF0ZXJpYWw7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgbW91c2UgY2xpY2sgYXMgKHgseSkgdmVjdG9yXG4gICAgdmFyIG1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICBtb3VzZS54ID0gKGV2ZW50LmNsaWVudFggLyB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuY2xpZW50V2lkdGgpICogMiAtIDE7XG4gICAgbW91c2UueSA9IC0gKGV2ZW50LmNsaWVudFkgLyB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIDIgKyAxO1xuXG4gICAgdmFyIG9iajogYW55ID0gdGhpcy5pbnRlcnNlY3RpbmdNZXNoKG1vdXNlKTtcbiAgICBcbiAgICAvLyBDaGFuZ2UgY29sb3JcbiAgICBpZihvYmope1xuICAgICAgLy8gU3RvcmVcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBvYmo7XG4gICAgICB0aGlzLnByZXZpb3VzTWF0ZXJpYWwgPSBvYmoubWF0ZXJpYWw7XG5cbiAgICAgIC8vIFNldCBuZXcgbWF0ZXJpYWxcbiAgICAgIG9iai5tYXRlcmlhbCA9IHRoaXMuaGlnaGxpZ2h0TWF0ZXJpYWw7XG5cbiAgICAgIC8vIEVtaXQgb3V0cHV0XG4gICAgICB0aGlzLmNsaWNrZWRSb29tLmVtaXQoe3VyaTogb2JqLm5hbWV9KTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICByZXR1cm47XG5cbiAgfVxuXG4gIHB1YmxpYyBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWR7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmKCF0aGlzLnJlbmRlcmVyKSByZXR1cm47XG5cbiAgICAvLyBEZWZpbmUgbW91c2UgY2xpY2sgYXMgKHgseSkgdmVjdG9yXG4gICAgdmFyIG1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICBtb3VzZS54ID0gKGV2ZW50LmNsaWVudFggLyB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuY2xpZW50V2lkdGgpICogMiAtIDE7XG4gICAgbW91c2UueSA9IC0gKGV2ZW50LmNsaWVudFkgLyB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIDIgKyAxO1xuXG4gICAgdmFyIG9iajogYW55ID0gdGhpcy5pbnRlcnNlY3RpbmdNZXNoKG1vdXNlKTtcblxuICAgIGlmKG9iaikge1xuXG4gICAgICAvLyBTYXZlIG1hdGVyaWFsIGZvciBsYXRlciBpZiBob3ZlciBqdXN0IGluaXRpYXRlZFxuICAgICAgaWYob2JqICE9IHRoaXMucHJldmlvdXNIb3ZlcmVkKXtcbiAgICAgICAgdGhpcy5jYW52YXNDbGFzcyA9IFwiY2xpY2thYmxlXCJcblxuICAgICAgICAvLyAvLyBSZXN0b3JlIG1hdGVyaWFsIGZvciBwcmV2aW91c2x5IGhvdmVyZWRcbiAgICAgICAgLy8gaWYodGhpcy5wcmV2aW91c0hvdmVyZWQpe1xuICAgICAgICAvLyAgIHRoaXMucHJldmlvdXNIb3ZlcmVkLm1hdGVyaWFsID0gdGhpcy5wcmV2aW91c01hdGVyaWFsO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gU2V0IGN1cnJlbnQgb2JqZWN0IHRvIHByZXZpb3VzbHkgaG92ZXJlZFxuICAgICAgICB0aGlzLnByZXZpb3VzSG92ZXJlZCA9IG9iajtcbiAgICAgICAgLy8gdGhpcy5wcmV2aW91c01hdGVyaWFsID0gb2JqLm1hdGVyaWFsO1xuXG4gICAgICAgIC8vIC8vIFNldCBob3ZlciBtYXRlcmlhbCBvbiBvYmplY3QgKGlmIG5vdCBzZWxlY3RlZClcbiAgICAgICAgLy8gaWYob2JqICE9IHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAvLyAgIG9iai5tYXRlcmlhbCA9IHRoaXMuaG92ZXJNYXRlcmlhbDtcbiAgICAgICAgLy8gfVxuICAgICAgICBcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGlmKHRoaXMucHJldmlvdXNIb3ZlcmVkKXtcbiAgICAgICAgdGhpcy5jYW52YXNDbGFzcyA9IFwiZGVmYXVsdFwiXG4gICAgICAgIC8vIGlmKHRoaXMucHJldmlvdXNIb3ZlcmVkICE9IHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAvLyAgIC8vIFJlc3RvcmUgbWF0ZXJpYWwgZm9yIHByZXZpb3VzbHkgaG92ZXJlZCBhbmQgc2V0IHByZXZpb3VzbHkgaG92ZXJlZCB0byBudWxsXG4gICAgICAgIC8vICAgdGhpcy5wcmV2aW91c0hvdmVyZWQubWF0ZXJpYWwgPSB0aGlzLnByZXZpb3VzTWF0ZXJpYWw7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5wcmV2aW91c0hvdmVyZWQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQWxsT2JqZWN0cyhwcmVkOiBUSFJFRS5PYmplY3QzRFtdLCBwYXJlbnQ6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgICAvLyBOT1RFOiBCZXR0ZXIgdG8ga2VlcCBzZXBhcmF0ZSBhcnJheSBvZiBzZWxlY3RlZCBvYmplY3RzXG4gICAgICBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICBwcmVkLnB1c2goaSk7XG4gICAgICAgICAgICAgIHRoaXMuZmluZEFsbE9iamVjdHMocHJlZCwgaSk7ICAgICAgICAgICAgICBcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHByaXZhdGUgaW50ZXJzZWN0aW5nTWVzaChtb3VzZSk6IFRIUkVFLk9iamVjdDNEIHtcblxuICAgIC8vIEdldCBhbGwgb2JqZWN0cyBpbiBzY2VuZVxuICAgIHZhciBvYmo6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcbiAgICB0aGlzLmZpbmRBbGxPYmplY3RzKG9iaiwgdGhpcy5zY2VuZSk7XG5cbiAgICAvLyBDcmVhdGUgcmF5Y2FzdGVyIGZyb20gY2FtZXJhIHRvd2FyZHMgbW91c2UgcG9zaXRpb25cbiAgICB2YXIgcmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpO1xuICAgIHJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKG1vdXNlLCB0aGlzLmNhbWVyYSk7XG5cbiAgICAvLyBGaW5kIGludGVyc2VjdGluZyBvYmplY3RzXG4gICAgdmFyIGludGVyc2VjdHMgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyhvYmopO1xuXG4gICAgaWYoaW50ZXJzZWN0cyl7XG4gICAgICAvLyBPbmx5IGludGVyZXN0ZWQgaW4gbWVzaGVzXG4gICAgICB2YXIgYSA9IGludGVyc2VjdHMuZmlsdGVyKHggPT4geC5vYmplY3QudHlwZSA9PSBcIk1lc2hcIilbMF07XG4gICAgICBpZihhKSByZXR1cm4gYS5vYmplY3Q7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBudWxsO1xuXG4gIH1cblxuICBwdWJsaWMgb25Nb3VzZVVwKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIm9uTW91c2VVcFwiKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25SZXNpemUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgY29uc29sZS5sb2coXCJvblJlc2l6ZTogXCIgKyB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoICsgXCIsIFwiICsgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuXG4gICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLmdldEFzcGVjdFJhdGlvKCk7XG4gICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTWVzaFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vbmctbWVzaC12aWV3ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ01lc2hWaWV3ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmdNZXNoVmlld2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNZXNoVmlld2VyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIlRIUkVFLlZlY3RvcjMiLCJUSFJFRS5Db2xvciIsIlRIUkVFLlBvaW50c01hdGVyaWFsIiwiVEhSRUUuQm94MyIsIlRIUkVFLkdlb21ldHJ5IiwiVEhSRUUuUG9pbnRzIiwiT0JKTG9hZGVyIiwiVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwiLCJUSFJFRS5TY2VuZSIsIlRIUkVFLkFtYmllbnRMaWdodCIsIlRIUkVFLlBvaW50TGlnaHQiLCJUSFJFRS5XZWJHTFJlbmRlcmVyIiwiVEhSRUUuT0JKTG9hZGVyIiwiZDMuc2NoZW1lQ2F0ZWdvcnkxMCIsInRzbGliXzEuX192YWx1ZXMiLCJUSFJFRS5Eb3VibGVTaWRlIiwiVEhSRUUuTWVzaCIsIlRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhIiwiVEhSRUUuVmVjdG9yMiIsIlRIUkVFLlJheWNhc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFtQkU7b0NBMkQrQixVQUFDLFdBQVcsRUFBRSxNQUFNO1lBQ2pELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7Z0JBRS9CLElBQUksSUFBSSxHQUFHLElBQUlBLE9BQWEsRUFBRSxDQUFDO2dCQUMvQixXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFHMUIsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFBO2dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLFdBQVEsR0FBRyxHQUFFOztnQkFHL0IsSUFBSSxXQUFXLEdBQUcsTUFBTSxHQUFDLE9BQU8sQ0FBQztnQkFFakMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztTQUNKO3NDQUVnQyxVQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsTUFBTTtZQUM5RCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07O2dCQUUvQixJQUFJLFFBQVEsR0FBRyxJQUFJQSxPQUFhLEVBQUUsQ0FBQztnQkFDbkMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Z0JBR2hDLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQTtnQkFDdEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztn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

/***/ }),

/***/ "./dist/ng-plan/fesm5/ng-plan.js":
/*!***************************************!*\
  !*** ./dist/ng-plan/fesm5/ng-plan.js ***!
  \***************************************/
/*! exports provided: PlanModule, ɵb, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanModule", function() { return PlanModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return CanvasEventsDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return PlanComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var d3_decompose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-decompose */ "./node_modules/d3-decompose/build/d3-decompose.mjs");
/* harmony import */ var d3_polygon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-polygon */ "./node_modules/d3-polygon/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlanComponent = /** @class */ (function () {
    function PlanComponent(matIconRegistry, domSanitizer) {
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.clickedRoom = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.clickedCanvas = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Styles
        this.selectedColor = '#ebefe4';
        this.defaultColor = '#f2flec';
        this.baseScale = 0.9;
        this.baseOffsetX = 0;
        this.baseOffsetY = 0;
        this.transform = "translate(" + this.baseOffsetX + "," + this.baseOffsetY + ") scale(" + this.baseScale + "," + this.baseScale + ")";
        this.movedX = 0;
        this.movedY = 0;
        this.scaled = 1;
        this.panMode = false;
        this.addNodeMode = false;
    }
    /**
     * @return {?}
     */
    PlanComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.getCanvasSize();
        // this.addSVGicons();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PlanComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["data"] && changes["data"].currentValue) {
            this.data = changes["data"].currentValue;
            this.extractRooms();
            this.getScaleOffset();
            this.zoomExtents();
        }
        if (changes["colors"] && changes["colors"].currentValue) {
            this.defineColors();
        }
        if (changes["selected"]) {
            this.updateSelection();
        }
    };
    // addSVGicons(){
    //   this.matIconRegistry.addSvgIcon(
    //     "zoom_extents",
    //     this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/zoom_extents.svg")
    //   );
    // }
    /**
     * @return {?}
     */
    PlanComponent.prototype.updateSelection = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.rooms)
            return;
        this.rooms = this.rooms.map(function (x) {
            if (_this.selected.indexOf(x.uri) != -1) {
                x.selected = true;
            }
            else {
                x.selected = false;
            }
            return x;
        });
    };
    /**
     * @return {?}
     */
    PlanComponent.prototype.defineColors = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.rooms.map(function (x) {
            var /** @type {?} */ match = _this.colors.filter(function (y) { return y.uri == x.uri; });
            if (match.length > 0) {
                x.color = match[0].color;
                x.description = match[0].value;
            }
            return x;
        });
    };
    /**
     * @return {?}
     */
    PlanComponent.prototype.getCanvasSize = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ element = this.planContainer.nativeElement;
        var /** @type {?} */ size = element.getBoundingClientRect();
        this.canvasWidth = size.width;
        this.canvasHeight = size.height;
        this.canvasCentroid = [this.canvasWidth / 2, this.canvasHeight / 2];
    };
    /**
     * @return {?}
     */
    PlanComponent.prototype.extractRooms = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.data.features)
            return this.rooms = null;
        // For bounding box [xMin, yMin, xMax, yMax]
        var /** @type {?} */ xMin;
        var /** @type {?} */ yMin;
        var /** @type {?} */ xMax;
        var /** @type {?} */ yMax;
        this.rooms = this.data.features.map(function (room) {
            var /** @type {?} */ polygons = [];
            var /** @type {?} */ roomPath = '';
            var /** @type {?} */ centroid;
            if (room.geometry && room.geometry.type == "Polygon") {
                var /** @type {?} */ roomPolygons = []; // Allow multi polygons if doughnut room
                room.geometry.coordinates.forEach(function (polygon) {
                    var /** @type {?} */ points = '';
                    var /** @type {?} */ path = '';
                    // Reflect y coordinates to fit browser coordinate system and extract to polygon
                    polygon.map(function (coordinate, index) {
                        var /** @type {?} */ x = coordinate[0];
                        var /** @type {?} */ y = -coordinate[1]; // reflect since SVG uses reflected coordinate system
                        points += x + "," + y + " ";
                        path += (index == 0) ? "M" + x + "," + y + " " : "L" + x + "," + y + " ";
                        coordinate[1] = y; // Update polygon with new y
                        // Get bounding box
                        if (!xMin || x < xMin)
                            xMin = x;
                        if (!xMax || x > xMax)
                            xMax = x;
                        if (!yMin || y < yMin)
                            yMin = y;
                        if (!yMax || y > yMax)
                            yMax = y;
                        return coordinate;
                    });
                    points = points.trim(); // remove last space
                    path = path.trim(); // remove last space
                    // Get polygon centroid from first polygon
                    if (roomPolygons.length < 1) {
                        centroid = Object(d3_polygon__WEBPACK_IMPORTED_MODULE_4__["polygonCentroid"])(polygon);
                    }
                    roomPolygons.push(points);
                    roomPath += path;
                });
                polygons.push(roomPolygons);
            }
            var /** @type {?} */ name = room.properties.name;
            var /** @type {?} */ uri = room.properties.uri;
            var /** @type {?} */ color = room.properties.color ? room.properties.color : _this.defaultColor;
            var /** @type {?} */ description = room.properties.description ? room.properties.description : '';
            // Store bounding box
            // Store bounding box
            _this.boundingBox = [xMin, yMin, xMax, yMax];
            return { name: name, uri: uri, description: description, color: color, polygons: polygons, path: roomPath, centroid: centroid };
        });
    };
    /**
     * @return {?}
     */
    PlanComponent.prototype.getScaleOffset = /**
     * @return {?}
     */
    function () {
        // Calculate data size
        var /** @type {?} */ bb = this.boundingBox;
        var /** @type {?} */ dataWidth = bb[2] - bb[0];
        var /** @type {?} */ dataHeight = bb[3] - bb[1];
        // Calculate scale factors
        var /** @type {?} */ scaleWidth = this.canvasWidth / dataWidth;
        var /** @type {?} */ scaleHeight = this.canvasHeight / dataHeight;
        var /** @type {?} */ scale = Math.min(scaleHeight, scaleWidth);
        var /** @type {?} */ scaledDataCentroid = [scale * (bb[0] + dataWidth / 2), scale * (bb[1] + dataHeight / 2)];
        // Calculate offset factors
        var /** @type {?} */ offsetX = this.canvasCentroid[0] - scaledDataCentroid[0];
        var /** @type {?} */ offsetY = this.canvasCentroid[1] - scaledDataCentroid[1];
        // Set global variables
        this.baseOffsetX = offsetX;
        this.baseOffsetY = offsetY;
        this.baseScale = scale;
        return [scale, offsetX, offsetY];
    };
    /**
     * @param {?} displacement
     * @return {?}
     */
    PlanComponent.prototype.move = /**
     * @param {?} displacement
     * @return {?}
     */
    function (displacement) {
        if (displacement) {
            this.zoomHandler(undefined, displacement);
        }
    };
    /**
     * @param {?} displacement
     * @return {?}
     */
    PlanComponent.prototype.moveEnd = /**
     * @param {?} displacement
     * @return {?}
     */
    function (displacement) {
        // Update moved coordinates
        this.movedX = this.movedX + displacement[0];
        this.movedY = this.movedY + displacement[1];
    };
    /**
     * @return {?}
     */
    PlanComponent.prototype.onWindowResize = /**
     * @return {?}
     */
    function () {
        this.getCanvasSize();
        this.getScaleOffset();
        this.zoomExtents();
    };
    /**
     * @return {?}
     */
    PlanComponent.prototype.zoomExtents = /**
     * @return {?}
     */
    function () {
        this.scaled = this.baseScale * 0.95;
        this.movedX = 0;
        this.movedY = 0;
        this.zoomHandler();
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    PlanComponent.prototype.zoomOut = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        // Calculate current scale
        var /** @type {?} */ scaleFactor = this.baseScale / 5;
        this.scaled = this.scaled - scaleFactor;
        this.zoomHandler(ev);
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    PlanComponent.prototype.zoomIn = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        var /** @type {?} */ scaleFactor = this.baseScale / 5;
        this.scaled = this.scaled + scaleFactor;
        this.zoomHandler(ev);
    };
    /**
     * @param {?=} ev
     * @param {?=} displacement
     * @return {?}
     */
    PlanComponent.prototype.zoomHandler = /**
     * @param {?=} ev
     * @param {?=} displacement
     * @return {?}
     */
    function (ev, displacement) {
        var /** @type {?} */ trns1 = '';
        if (displacement) {
            var /** @type {?} */ dx = this.baseOffsetX + this.movedX + displacement[0];
            var /** @type {?} */ dy = this.baseOffsetY + this.movedY + displacement[1];
        }
        else {
            dx = this.baseOffsetX + this.movedX;
            dy = this.baseOffsetY + this.movedY;
        }
        // This should be adjusted to center at mouse position while zooming
        // if(ev && ev.offsetX){
        //     // Get mouse position relative to canvas center point and move
        //     var mx = ev.offsetX-this.canvasCentroid[0];
        //     var my = ev.offsetY-this.canvasCentroid[1];
        //     var dx2 = mx;
        //     var dy2 = my;
        //     trns1 = `translate(${dx2},${dy2})`;
        //     console.log(trns1)
        // }
        var /** @type {?} */ oldScale = Object(d3_decompose__WEBPACK_IMPORTED_MODULE_3__["decompose"])(this.transform).scale;
        var /** @type {?} */ oldTrns = Object(d3_decompose__WEBPACK_IMPORTED_MODULE_3__["decompose"])(this.transform).translate;
        var /** @type {?} */ scale = "scale(" + this.scaled + "," + this.scaled + ")";
        var /** @type {?} */ trns = "translate(" + dx + "," + dy + ")";
        // Update transform attribute
        this.transform = trns + trns1 + scale;
        // this.transform = this.transform.replace(oldScale,scale);
    };
    /**
     * @param {?} ev
     * @param {?} room
     * @return {?}
     */
    PlanComponent.prototype.selectRoom = /**
     * @param {?} ev
     * @param {?} room
     * @return {?}
     */
    function (ev, room) {
        // Get coordinates
        var /** @type {?} */ scale = this.scaled;
        var /** @type {?} */ offsetX = this.baseOffsetX + this.movedX;
        var /** @type {?} */ offsetY = this.baseOffsetY + this.movedY;
        var /** @type {?} */ screenX = ev.offsetX;
        var /** @type {?} */ screenY = ev.offsetX;
        var /** @type {?} */ x = (screenX - offsetX) / scale;
        var /** @type {?} */ y = (screenY - offsetY) / scale;
        var /** @type {?} */ coordinates = [x, -y];
        // Emit event
        this.clickedRoom.emit({ uri: room.uri, coordinates: coordinates });
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    PlanComponent.prototype.onCanvasClick = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        if (ev.target.id != 'canvas')
            return;
        this.clickedCanvas.emit();
    };
    PlanComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-plan',
                    template: "<!-- Toolbar -->\n<div class=\"toolbar\" *ngIf=\"toolbar\">\n    <div class=\"icon-div\" (click)=\"zoomIn(null)\" matTooltip=\"Zoom in\">\n        <mat-icon>zoom_in</mat-icon>\n    </div>\n    <div class=\"icon-div\" (click)=\"zoomOut(null)\" matTooltip=\"Zoom out\">\n        <mat-icon>zoom_out</mat-icon>\n    </div>\n    <div class=\"icon-div\" (click)=\"zoomExtents()\" matTooltip=\"Zoom extents\">\n        <mat-icon svgIcon=\"zoom_extents\"></mat-icon>\n    </div>\n</div>\n\n<div class=\"footer\">\n    <p>Press and hold \"Alt\" to pan</p>\n</div>\n\n<svg canvasEvents\n    [style.cursor]=\"panMode ? 'move' : 'default'\"\n    #canvas\n    class=canvas\n    (click)=\"onCanvasClick($event)\"\n    (zoomOut)=\"zoomOut($event)\"\n    (zoomIn)=\"zoomIn($event)\"\n    (panMode)=\"panMode = $event\"\n    (move)=\"move($event)\"\n    (moveEnd)=\"moveEnd($event)\"\n    (window:resize)=\"onWindowResize()\"\n    (addNodeMode)=\"addNodeMode = $event\"\n    id=\"canvas\">\n\n    <!--Draw rooms-->\n    <g *ngFor=\"let room of rooms\"\n        [attr.transform]=\"transform\"\n        [id]=\"room.uri\"\n        (click)=\"selectRoom($event, room)\"\n        [attr.fill]=\"room.selected ? selectedColor : room.color\"\n        class=\"room\">\n\n        <!-- Draw polygons -->\n        <!-- <polygon *ngFor=\"let polygon of room.polygons\" \n            [attr.points]=\"polygon\" \n            class=\"polygon\">\n        </polygon> -->\n\n        <!-- Draw paths -->\n        <path\n            [class.selected-space]=\"room.selected\"\n            [attr.d]=\"room.path\"\n            class=\"polygon\">\n        </path> \n\n        <!-- Draw centroids -->\n        <circle \n            *ngIf=\"centroids\" \n            [attr.cx]=\"room.centroid[0]\" \n            fill=\"black\" \n            [attr.cy]=\"room.centroid[1]\" \n            [attr.r]=\"scaled*500\">\n        </circle>\n\n        <!-- Add labels -->\n        <text \n            [style.font-size.em]=\"'12'\"\n            style = \"font-family:roboto; fill: black;\"\n            text-anchor=\"middle\" \n            alignment-baseline=\"central\"\n            [attr.x]=\"room.centroid[0]\"\n            [attr.dy]=\"room.description ? -150 : 0\"\n            [attr.y]=\"room.centroid[1]\">\n            {{room.name}}\n        </text>\n\n        <!-- Add description -->\n        <text \n            *ngIf = \"room.description\"\n            [style.font-size.em]=\"'10'\"\n            style = \"font-family:roboto; fill: black;\"\n            text-anchor=\"middle\" \n            alignment-baseline=\"central\"\n            [attr.x]=\"room.centroid[0]\"\n            [attr.y]=\"room.centroid[1]\"\n            dy=\"150\">\n            {{room.description}}\n        </text>\n    </g>\n\n</svg>",
                    styles: [".canvas{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%;height:100%;position:fixed;top:0;left:0;bottom:0;right:0;z-index:-1}.polygon{stroke:#000;stroke-width:1;vector-effect:non-scaling-stroke;fill-rule:evenodd}.room:hover{opacity:.5;cursor:pointer}.selected-space{stroke-width:2}.toolbar{position:absolute;color:red;right:20px;width:100%}.icon-div>.mat-icon{float:right;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:rgba(220,220,220,.3);border-width:1px;border-radius:5px;margin-left:5px;padding:5px;z-index:1}.mat-icon{color:rgba(0,0,0,.6);font-size:30px;height:30px;width:30px;z-index:10}.mat-icon:hover{cursor:pointer;color:rgba(0,0,0,1)}.footer{background-color:rgba(220,220,220,.3);position:absolute;font-family:consolas;font-size:12px;padding:0 10px;border-radius:5px;bottom:10px}"]
                },] },
    ];
    /** @nocollapse */
    PlanComponent.ctorParameters = function () { return [
        { type: _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIconRegistry"], },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"], },
    ]; };
    PlanComponent.propDecorators = {
        "clickedRoom": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "clickedCanvas": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "data": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "colors": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "centroids": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "toolbar": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "selected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "selectedColor": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "defaultColor": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "planContainer": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['canvas',] },],
    };
    return PlanComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CanvasEventsDirective = /** @class */ (function () {
    function CanvasEventsDirective() {
        this.zoomOut = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.zoomIn = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.moveInit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.move = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.moveEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.panMode = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.addNodeMode = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.mouseDown = false;
        this.dragMode = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasEventsDirective.prototype.onMouseWheelChrome = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mouseWheelFunc(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasEventsDirective.prototype.onMouseWheelFirefox = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mouseWheelFunc(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasEventsDirective.prototype.onMouseWheelIE = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mouseWheelFunc(event);
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    CanvasEventsDirective.prototype.onKeyDown = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        if (ev.key == "ArrowDown") {
            this.zoomIn.emit(ev);
        }
        if (ev.key == "ArrowUp") {
            this.zoomOut.emit(ev);
        }
        if (ev.key == "Alt") {
            // enable drag mode if holding Alt
            this.dragMode = true;
            this.panMode.emit(true);
        }
        if (ev.key == "Control") {
            this.addNodeMode.emit(true);
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    CanvasEventsDirective.prototype.onKeyUp = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        if (ev.key == "Alt") {
            // disable drag mode if releasing Alt
            this.dragMode = false;
            this.panMode.emit(false);
        }
        if (ev.key == "Control") {
            this.addNodeMode.emit(false);
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    CanvasEventsDirective.prototype.onMouseClick = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        this.mouseDown = true;
        // enable drag mode if clicking middle button
        if (ev.button == 1)
            this.dragMode = true;
        if (this.dragMode) {
            this.clickX = ev.offsetX;
            this.clickY = ev.offsetY;
            this.panMode.emit(true);
            this.moveInit.emit([ev.offsetX, ev.offsetY]);
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    CanvasEventsDirective.prototype.onMouseMove = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        if (this.dragMode && this.mouseDown) {
            this.move.emit([ev.offsetX - this.clickX, ev.offsetY - this.clickY]);
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    CanvasEventsDirective.prototype.onMouseUp = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        this.mouseDown = false;
        if (this.dragMode) {
            this.dragMode = false;
            this.panMode.emit(false);
            this.moveEnd.emit([ev.offsetX - this.clickX, ev.offsetY - this.clickY]);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasEventsDirective.prototype.mouseWheelFunc = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ event = window.event || event; // old IE support
        var /** @type {?} */ delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if (delta > 0) {
            this.zoomIn.emit(event);
        }
        else if (delta < 0) {
            this.zoomOut.emit(event);
        }
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if (event.preventDefault) {
            event.preventDefault();
        }
    };
    CanvasEventsDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{ selector: '[canvasEvents]' },] },
    ];
    /** @nocollapse */
    CanvasEventsDirective.propDecorators = {
        "zoomOut": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "zoomIn": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "moveInit": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "move": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "moveEnd": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "panMode": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "addNodeMode": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onMouseWheelChrome": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['mousewheel', ['$event'],] },],
        "onMouseWheelFirefox": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['DOMMouseScroll', ['$event'],] },],
        "onMouseWheelIE": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['onmousewheel', ['$event'],] },],
        "onKeyDown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:keydown', ['$event'],] },],
        "onKeyUp": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:keyup', ['$event'],] },],
        "onMouseClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['mousedown', ['$event'],] },],
        "onMouseMove": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['mousemove', ['$event'],] },],
        "onMouseUp": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['mouseup', ['$event'],] },],
    };
    return CanvasEventsDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlanModule = /** @class */ (function () {
    function PlanModule() {
    }
    PlanModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"]
                    ],
                    declarations: [PlanComponent, CanvasEventsDirective],
                    exports: [PlanComponent]
                },] },
    ];
    return PlanModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcGxhbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctcGxhbi9saWIvcGxhbi5jb21wb25lbnQudHMiLCJuZzovL25nLXBsYW4vbGliL2NhbnZhcy1ldmVudHMuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1wbGFuL2xpYi9wbGFuLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2ljb25cIjtcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5cbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzLWRlY29tcG9zZSc7ICAvLyB0YWtlcyBTVkcgb3IgQ1NTMyB0cmFuc2Zvcm0gc3RyaW5ncyBhbmQgY29udmVydHMgdGhlbSBpbnRvIHVzYWJsZSB2YWx1ZXNcbmltcG9ydCAqIGFzIGQzcCBmcm9tICdkMy1wb2x5Z29uJzsgICAvLyBPcGVyYXRpb25zIG9uIHBvbHlnb25zXG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9vbSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHBvbHlnb25zOiBzdHJpbmdbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZy1wbGFuJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gVG9vbGJhciAtLT5cclxuPGRpdiBjbGFzcz1cInRvb2xiYXJcIiAqbmdJZj1cInRvb2xiYXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpY29uLWRpdlwiIChjbGljayk9XCJ6b29tSW4obnVsbClcIiBtYXRUb29sdGlwPVwiWm9vbSBpblwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj56b29tX2luPC9tYXQtaWNvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImljb24tZGl2XCIgKGNsaWNrKT1cInpvb21PdXQobnVsbClcIiBtYXRUb29sdGlwPVwiWm9vbSBvdXRcIj5cclxuICAgICAgICA8bWF0LWljb24+em9vbV9vdXQ8L21hdC1pY29uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaWNvbi1kaXZcIiAoY2xpY2spPVwiem9vbUV4dGVudHMoKVwiIG1hdFRvb2x0aXA9XCJab29tIGV4dGVudHNcIj5cclxuICAgICAgICA8bWF0LWljb24gc3ZnSWNvbj1cInpvb21fZXh0ZW50c1wiPjwvbWF0LWljb24+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwiZm9vdGVyXCI+XHJcbiAgICA8cD5QcmVzcyBhbmQgaG9sZCBcIkFsdFwiIHRvIHBhbjwvcD5cclxuPC9kaXY+XHJcblxyXG48c3ZnIGNhbnZhc0V2ZW50c1xyXG4gICAgW3N0eWxlLmN1cnNvcl09XCJwYW5Nb2RlID8gJ21vdmUnIDogJ2RlZmF1bHQnXCJcclxuICAgICNjYW52YXNcclxuICAgIGNsYXNzPWNhbnZhc1xyXG4gICAgKGNsaWNrKT1cIm9uQ2FudmFzQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAoem9vbU91dCk9XCJ6b29tT3V0KCRldmVudClcIlxyXG4gICAgKHpvb21Jbik9XCJ6b29tSW4oJGV2ZW50KVwiXHJcbiAgICAocGFuTW9kZSk9XCJwYW5Nb2RlID0gJGV2ZW50XCJcclxuICAgIChtb3ZlKT1cIm1vdmUoJGV2ZW50KVwiXHJcbiAgICAobW92ZUVuZCk9XCJtb3ZlRW5kKCRldmVudClcIlxyXG4gICAgKHdpbmRvdzpyZXNpemUpPVwib25XaW5kb3dSZXNpemUoKVwiXHJcbiAgICAoYWRkTm9kZU1vZGUpPVwiYWRkTm9kZU1vZGUgPSAkZXZlbnRcIlxyXG4gICAgaWQ9XCJjYW52YXNcIj5cclxuXHJcbiAgICA8IS0tRHJhdyByb29tcy0tPlxyXG4gICAgPGcgKm5nRm9yPVwibGV0IHJvb20gb2Ygcm9vbXNcIlxyXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxyXG4gICAgICAgIFtpZF09XCJyb29tLnVyaVwiXHJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdFJvb20oJGV2ZW50LCByb29tKVwiXHJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJyb29tLnNlbGVjdGVkID8gc2VsZWN0ZWRDb2xvciA6IHJvb20uY29sb3JcIlxyXG4gICAgICAgIGNsYXNzPVwicm9vbVwiPlxyXG5cclxuICAgICAgICA8IS0tIERyYXcgcG9seWdvbnMgLS0+XHJcbiAgICAgICAgPCEtLSA8cG9seWdvbiAqbmdGb3I9XCJsZXQgcG9seWdvbiBvZiByb29tLnBvbHlnb25zXCIgXHJcbiAgICAgICAgICAgIFthdHRyLnBvaW50c109XCJwb2x5Z29uXCIgXHJcbiAgICAgICAgICAgIGNsYXNzPVwicG9seWdvblwiPlxyXG4gICAgICAgIDwvcG9seWdvbj4gLS0+XHJcblxyXG4gICAgICAgIDwhLS0gRHJhdyBwYXRocyAtLT5cclxuICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICBbY2xhc3Muc2VsZWN0ZWQtc3BhY2VdPVwicm9vbS5zZWxlY3RlZFwiXHJcbiAgICAgICAgICAgIFthdHRyLmRdPVwicm9vbS5wYXRoXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJwb2x5Z29uXCI+XHJcbiAgICAgICAgPC9wYXRoPiBcclxuXHJcbiAgICAgICAgPCEtLSBEcmF3IGNlbnRyb2lkcyAtLT5cclxuICAgICAgICA8Y2lyY2xlIFxyXG4gICAgICAgICAgICAqbmdJZj1cImNlbnRyb2lkc1wiIFxyXG4gICAgICAgICAgICBbYXR0ci5jeF09XCJyb29tLmNlbnRyb2lkWzBdXCIgXHJcbiAgICAgICAgICAgIGZpbGw9XCJibGFja1wiIFxyXG4gICAgICAgICAgICBbYXR0ci5jeV09XCJyb29tLmNlbnRyb2lkWzFdXCIgXHJcbiAgICAgICAgICAgIFthdHRyLnJdPVwic2NhbGVkKjUwMFwiPlxyXG4gICAgICAgIDwvY2lyY2xlPlxyXG5cclxuICAgICAgICA8IS0tIEFkZCBsYWJlbHMgLS0+XHJcbiAgICAgICAgPHRleHQgXHJcbiAgICAgICAgICAgIFtzdHlsZS5mb250LXNpemUuZW1dPVwiJzEyJ1wiXHJcbiAgICAgICAgICAgIHN0eWxlID0gXCJmb250LWZhbWlseTpyb2JvdG87IGZpbGw6IGJsYWNrO1wiXHJcbiAgICAgICAgICAgIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgXHJcbiAgICAgICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImNlbnRyYWxcIlxyXG4gICAgICAgICAgICBbYXR0ci54XT1cInJvb20uY2VudHJvaWRbMF1cIlxyXG4gICAgICAgICAgICBbYXR0ci5keV09XCJyb29tLmRlc2NyaXB0aW9uID8gLTE1MCA6IDBcIlxyXG4gICAgICAgICAgICBbYXR0ci55XT1cInJvb20uY2VudHJvaWRbMV1cIj5cclxuICAgICAgICAgICAge3tyb29tLm5hbWV9fVxyXG4gICAgICAgIDwvdGV4dD5cclxuXHJcbiAgICAgICAgPCEtLSBBZGQgZGVzY3JpcHRpb24gLS0+XHJcbiAgICAgICAgPHRleHQgXHJcbiAgICAgICAgICAgICpuZ0lmID0gXCJyb29tLmRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZS5lbV09XCInMTAnXCJcclxuICAgICAgICAgICAgc3R5bGUgPSBcImZvbnQtZmFtaWx5OnJvYm90bzsgZmlsbDogYmxhY2s7XCJcclxuICAgICAgICAgICAgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBcclxuICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiY2VudHJhbFwiXHJcbiAgICAgICAgICAgIFthdHRyLnhdPVwicm9vbS5jZW50cm9pZFswXVwiXHJcbiAgICAgICAgICAgIFthdHRyLnldPVwicm9vbS5jZW50cm9pZFsxXVwiXHJcbiAgICAgICAgICAgIGR5PVwiMTUwXCI+XHJcbiAgICAgICAgICAgIHt7cm9vbS5kZXNjcmlwdGlvbn19XHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgPC9nPlxyXG5cclxuPC9zdmc+YCxcbiAgICBzdHlsZXM6IFtgLmNhbnZhc3std2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDt6LWluZGV4Oi0xfS5wb2x5Z29ue3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDoxO3ZlY3Rvci1lZmZlY3Q6bm9uLXNjYWxpbmctc3Ryb2tlO2ZpbGwtcnVsZTpldmVub2RkfS5yb29tOmhvdmVye29wYWNpdHk6LjU7Y3Vyc29yOnBvaW50ZXJ9LnNlbGVjdGVkLXNwYWNle3N0cm9rZS13aWR0aDoyfS50b29sYmFye3Bvc2l0aW9uOmFic29sdXRlO2NvbG9yOnJlZDtyaWdodDoyMHB4O3dpZHRoOjEwMCV9Lmljb24tZGl2Pi5tYXQtaWNvbntmbG9hdDpyaWdodDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIyMCwyMjAsMjIwLC4zKTtib3JkZXItd2lkdGg6MXB4O2JvcmRlci1yYWRpdXM6NXB4O21hcmdpbi1sZWZ0OjVweDtwYWRkaW5nOjVweDt6LWluZGV4OjF9Lm1hdC1pY29ue2NvbG9yOnJnYmEoMCwwLDAsLjYpO2ZvbnQtc2l6ZTozMHB4O2hlaWdodDozMHB4O3dpZHRoOjMwcHg7ei1pbmRleDoxMH0ubWF0LWljb246aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmdiYSgwLDAsMCwxKX0uZm9vdGVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyMjAsMjIwLDIyMCwuMyk7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1mYW1pbHk6Y29uc29sYXM7Zm9udC1zaXplOjEycHg7cGFkZGluZzowIDEwcHg7Ym9yZGVyLXJhZGl1czo1cHg7Ym90dG9tOjEwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGxhbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQE91dHB1dCgpIGNsaWNrZWRSb29tID0gbmV3IEV2ZW50RW1pdHRlcigpOyAgICAgICAgICAgICAvLyBDbGlja2VkIHJvb21cbiAgICBAT3V0cHV0KCkgY2xpY2tlZENhbnZhcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHByaXZhdGUgZGF0YTsgICAgICAgICAgICAgICAgICAgICAgIC8vZ2VvSlNPTlxuICAgIEBJbnB1dCgpIHByaXZhdGUgY29sb3JzOyAgICAgICAgICAgICAgICAgICAgIC8vY29sb3Igc2NoZW1hXG4gICAgQElucHV0KCkgcHVibGljIGNlbnRyb2lkczogYm9vbGVhbjsgICAgICAgICAgLy9jb2xvciBzY2hlbWFcbiAgICBASW5wdXQoKSBwdWJsaWMgdG9vbGJhcjogYm9vbGVhbjsgICAgICAgICAgICAvL3Rvb2xiYXIgdmlzaWJsZT9cbiAgICBASW5wdXQoKSBwcml2YXRlIHNlbGVjdGVkOiBzdHJpbmdbXTsgICAgICAgICAvL1NwYWNlcyB0byBiZSBoaWdobGlnaHRlZFxuXG4gICAgLy8gU3R5bGVzXG4gICAgQElucHV0KCkgcHVibGljIHNlbGVjdGVkQ29sb3I6IHN0cmluZyA9ICcjZWJlZmU0JztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVmYXVsdENvbG9yOiBzdHJpbmcgPSAnI2YyZmxlYyc7XG5cbiAgICBwdWJsaWMgcm9vbXM7XG5cbiAgICAvLyBDYW52YXNcbiAgICBwcml2YXRlIGNhbnZhc1dpZHRoO1xuICAgIHByaXZhdGUgY2FudmFzSGVpZ2h0O1xuICAgIHByaXZhdGUgY2FudmFzQ2VudHJvaWQ7XG5cbiAgICAvLyBTY2FsZSAvIG9mZnNldFxuICAgIC8vIFRoZXNlIGZhY3RvcnMgYXJlIGNhbGN1bGF0ZWQgZnJvbSBnZW9tZXRyeSBleHRlbmRzXG4gICAgcHJpdmF0ZSBiYXNlU2NhbGUgPSAwLjk7XG4gICAgcHJpdmF0ZSBiYXNlT2Zmc2V0WCA9IDA7XG4gICAgcHJpdmF0ZSBiYXNlT2Zmc2V0WSA9IDA7XG5cbiAgICAvLyBnZW9tZXRyeVxuICAgIHB1YmxpYyB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5iYXNlT2Zmc2V0WH0sJHt0aGlzLmJhc2VPZmZzZXRZfSkgc2NhbGUoJHt0aGlzLmJhc2VTY2FsZX0sJHt0aGlzLmJhc2VTY2FsZX0pYDtcbiAgICBwcml2YXRlIG1vdmVkWDogbnVtYmVyID0gMDsgLy8gc3RvcmUgbW92ZSBzdGF0ZVxuICAgIHByaXZhdGUgbW92ZWRZOiBudW1iZXIgPSAwOyAvLyBzdG9yZSBtb3ZlIHN0YXRlXG4gICAgcHVibGljIHNjYWxlZDogbnVtYmVyID0gMSAvLyBzdG9yZSBzY2FsZSBzdGF0ZVxuICAgIHB1YmxpYyBib3VuZGluZ0JveDsgICAgICAgICAvLyBTdG9yZXMgYm91bmRpbmdCb3ggYXMgW3hNaW4sIHlNaW4sIHhNYXgsIHlNYXhdXG5cbiAgICAvLyBtb2Rlc1xuICAgIHB1YmxpYyBwYW5Nb2RlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGFkZE5vZGVNb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkKCdjYW52YXMnKSBwcml2YXRlIHBsYW5Db250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgbWF0SWNvblJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnksXG4gICAgICBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICAgKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgICAgIHRoaXMuZ2V0Q2FudmFzU2l6ZSgpO1xuICAgICAgICAvLyB0aGlzLmFkZFNWR2ljb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5kYXRhICYmIGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmV4dHJhY3RSb29tcygpO1xuICAgICAgICAgICAgdGhpcy5nZXRTY2FsZU9mZnNldCgpO1xuICAgICAgICAgICAgdGhpcy56b29tRXh0ZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzLmNvbG9ycyAmJiBjaGFuZ2VzLmNvbG9ycy5jdXJyZW50VmFsdWUpe1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVDb2xvcnMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkU1ZHaWNvbnMoKXtcbiAgICAvLyAgIHRoaXMubWF0SWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oXG4gICAgLy8gICAgIFwiem9vbV9leHRlbnRzXCIsXG4gICAgLy8gICAgIHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcIi4uL2Fzc2V0cy96b29tX2V4dGVudHMuc3ZnXCIpXG4gICAgLy8gICApO1xuICAgIC8vIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbigpe1xuICAgICAgICBpZighdGhpcy5yb29tcykgcmV0dXJuO1xuICAgICAgICB0aGlzLnJvb21zID0gdGhpcy5yb29tcy5tYXAoeCA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkLmluZGV4T2YoeC51cmkpICE9IC0xKXtcbiAgICAgICAgICAgICAgICB4LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHguc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlZmluZUNvbG9ycygpe1xuICAgICAgICB0aGlzLnJvb21zLm1hcCh4ID0+IHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuY29sb3JzLmZpbHRlcih5ID0+IHkudXJpID09IHgudXJpKTtcbiAgICAgICAgICAgIGlmKG1hdGNoLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHguY29sb3IgPSBtYXRjaFswXS5jb2xvcjtcbiAgICAgICAgICAgICAgICB4LmRlc2NyaXB0aW9uID0gbWF0Y2hbMF0udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2FudmFzU2l6ZSgpe1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5wbGFuQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNpemUgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXNDZW50cm9pZCA9IFt0aGlzLmNhbnZhc1dpZHRoLzIsIHRoaXMuY2FudmFzSGVpZ2h0LzJdOyAgICAgICAgXG4gICAgfVxuXG4gICAgZXh0cmFjdFJvb21zKCl7XG4gICAgICAgIGlmKCF0aGlzLmRhdGEuZmVhdHVyZXMpIHJldHVybiB0aGlzLnJvb21zID0gbnVsbDtcblxuICAgICAgICAvLyBGb3IgYm91bmRpbmcgYm94IFt4TWluLCB5TWluLCB4TWF4LCB5TWF4XVxuICAgICAgICB2YXIgeE1pbjtcbiAgICAgICAgdmFyIHlNaW47XG4gICAgICAgIHZhciB4TWF4O1xuICAgICAgICB2YXIgeU1heDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucm9vbXMgPSB0aGlzLmRhdGEuZmVhdHVyZXMubWFwKHJvb20gPT4ge1xuICAgICAgICAgICAgdmFyIHBvbHlnb25zID0gW107XG4gICAgICAgICAgICB2YXIgcm9vbVBhdGggPSAnJztcbiAgICAgICAgICAgIHZhciBjZW50cm9pZDtcbiAgICAgICAgICAgIGlmKHJvb20uZ2VvbWV0cnkgJiYgcm9vbS5nZW9tZXRyeS50eXBlID09IFwiUG9seWdvblwiKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcm9vbVBvbHlnb25zID0gW107ICAvLyBBbGxvdyBtdWx0aSBwb2x5Z29ucyBpZiBkb3VnaG51dCByb29tXG4gICAgICAgICAgICAgICAgcm9vbS5nZW9tZXRyeS5jb29yZGluYXRlcy5mb3JFYWNoKHBvbHlnb24gPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSAnJztcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVmbGVjdCB5IGNvb3JkaW5hdGVzIHRvIGZpdCBicm93c2VyIGNvb3JkaW5hdGUgc3lzdGVtIGFuZCBleHRyYWN0IHRvIHBvbHlnb25cbiAgICAgICAgICAgICAgICAgICAgcG9seWdvbi5tYXAoKGNvb3JkaW5hdGUsaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4ID0gY29vcmRpbmF0ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ID0gLWNvb3JkaW5hdGVbMV07IC8vIHJlZmxlY3Qgc2luY2UgU1ZHIHVzZXMgcmVmbGVjdGVkIGNvb3JkaW5hdGUgc3lzdGVtXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cys9IGAke3h9LCR7eX0gYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGgrPSAoaW5kZXggPT0gMCkgPyBgTSR7eH0sJHt5fSBgIDogYEwke3h9LCR7eX0gYDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZVsxXSA9IHk7IC8vIFVwZGF0ZSBwb2x5Z29uIHdpdGggbmV3IHlcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGJvdW5kaW5nIGJveFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXhNaW4gfHwgeCA8IHhNaW4pIHhNaW4gPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXhNYXggfHwgeCA+IHhNYXgpIHhNYXggPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXlNaW4gfHwgeSA8IHlNaW4pIHlNaW4gPSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXlNYXggfHwgeSA+IHlNYXgpIHlNYXggPSB5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzID0gcG9pbnRzLnRyaW0oKTsgICAgLy8gcmVtb3ZlIGxhc3Qgc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHBhdGgudHJpbSgpOyAgICAgICAgIC8vIHJlbW92ZSBsYXN0IHNwYWNlXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHBvbHlnb24gY2VudHJvaWQgZnJvbSBmaXJzdCBwb2x5Z29uXG4gICAgICAgICAgICAgICAgICAgIGlmKHJvb21Qb2x5Z29ucy5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRyb2lkID0gZDNwLnBvbHlnb25DZW50cm9pZChwb2x5Z29uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJvb21Qb2x5Z29ucy5wdXNoKHBvaW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHJvb21QYXRoKz1wYXRoO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBvbHlnb25zLnB1c2gocm9vbVBvbHlnb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuYW1lID0gcm9vbS5wcm9wZXJ0aWVzLm5hbWU7XG4gICAgICAgICAgICB2YXIgdXJpID0gcm9vbS5wcm9wZXJ0aWVzLnVyaTtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IHJvb20ucHJvcGVydGllcy5jb2xvciA/IHJvb20ucHJvcGVydGllcy5jb2xvciA6IHRoaXMuZGVmYXVsdENvbG9yO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gcm9vbS5wcm9wZXJ0aWVzLmRlc2NyaXB0aW9uID8gcm9vbS5wcm9wZXJ0aWVzLmRlc2NyaXB0aW9uIDogJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFN0b3JlIGJvdW5kaW5nIGJveFxuICAgICAgICAgICAgdGhpcy5ib3VuZGluZ0JveCA9IFt4TWluLCB5TWluLCB4TWF4LCB5TWF4XTtcblxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBuYW1lLCB1cmk6IHVyaSwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLCBjb2xvcjogY29sb3IsIHBvbHlnb25zOiBwb2x5Z29ucywgcGF0aDpyb29tUGF0aCwgY2VudHJvaWQ6IGNlbnRyb2lkfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTY2FsZU9mZnNldCgpIHsgICBcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGRhdGEgc2l6ZVxuICAgICAgICB2YXIgYmIgPSB0aGlzLmJvdW5kaW5nQm94O1xuICAgICAgICB2YXIgZGF0YVdpZHRoID0gYmJbMl0tYmJbMF07XG4gICAgICAgIHZhciBkYXRhSGVpZ2h0ID0gYmJbM10tYmJbMV07XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHNjYWxlIGZhY3RvcnNcbiAgICAgICAgdmFyIHNjYWxlV2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoL2RhdGFXaWR0aDtcbiAgICAgICAgdmFyIHNjYWxlSGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQvZGF0YUhlaWdodDtcbiAgICAgICAgdmFyIHNjYWxlID0gTWF0aC5taW4oc2NhbGVIZWlnaHQsc2NhbGVXaWR0aCk7XG5cbiAgICAgICAgdmFyIHNjYWxlZERhdGFDZW50cm9pZCA9IFtzY2FsZSooYmJbMF0rZGF0YVdpZHRoLzIpLCBzY2FsZSooYmJbMV0rZGF0YUhlaWdodC8yKV07XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIG9mZnNldCBmYWN0b3JzXG4gICAgICAgIHZhciBvZmZzZXRYID0gdGhpcy5jYW52YXNDZW50cm9pZFswXS1zY2FsZWREYXRhQ2VudHJvaWRbMF07XG4gICAgICAgIHZhciBvZmZzZXRZID0gdGhpcy5jYW52YXNDZW50cm9pZFsxXS1zY2FsZWREYXRhQ2VudHJvaWRbMV07XG5cbiAgICAgICAgLy8gU2V0IGdsb2JhbCB2YXJpYWJsZXNcbiAgICAgICAgdGhpcy5iYXNlT2Zmc2V0WCA9IG9mZnNldFg7XG4gICAgICAgIHRoaXMuYmFzZU9mZnNldFkgPSBvZmZzZXRZO1xuICAgICAgICB0aGlzLmJhc2VTY2FsZSA9IHNjYWxlO1xuICAgIFxuICAgICAgICByZXR1cm4gW3NjYWxlLG9mZnNldFgsb2Zmc2V0WV1cbiAgICB9XG5cbiAgICBtb3ZlKGRpc3BsYWNlbWVudCl7XG4gICAgICAgIGlmKGRpc3BsYWNlbWVudCl7XG4gICAgICAgICAgICB0aGlzLnpvb21IYW5kbGVyKHVuZGVmaW5lZCxkaXNwbGFjZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUVuZChkaXNwbGFjZW1lbnQpe1xuICAgICAgICAvLyBVcGRhdGUgbW92ZWQgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5tb3ZlZFggPSB0aGlzLm1vdmVkWCtkaXNwbGFjZW1lbnRbMF07XG4gICAgICAgIHRoaXMubW92ZWRZID0gdGhpcy5tb3ZlZFkrZGlzcGxhY2VtZW50WzFdO1xuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKCl7XG4gICAgICAgIHRoaXMuZ2V0Q2FudmFzU2l6ZSgpO1xuICAgICAgICB0aGlzLmdldFNjYWxlT2Zmc2V0KCk7XG4gICAgICAgIHRoaXMuem9vbUV4dGVudHMoKTtcbiAgICB9XG5cbiAgICB6b29tRXh0ZW50cygpe1xuICAgICAgICB0aGlzLnNjYWxlZCA9IHRoaXMuYmFzZVNjYWxlKjAuOTU7XG4gICAgICAgIHRoaXMubW92ZWRYID0gMDtcbiAgICAgICAgdGhpcy5tb3ZlZFkgPSAwO1xuICAgICAgICB0aGlzLnpvb21IYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgem9vbU91dChldil7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBjdXJyZW50IHNjYWxlXG4gICAgICAgIHZhciBzY2FsZUZhY3RvciA9IHRoaXMuYmFzZVNjYWxlLzU7XG4gICAgICAgIHRoaXMuc2NhbGVkID0gdGhpcy5zY2FsZWQtc2NhbGVGYWN0b3I7XG4gICAgICAgIHRoaXMuem9vbUhhbmRsZXIoZXYpO1xuICAgIH1cblxuICAgIHpvb21Jbihldil7XG4gICAgICAgIHZhciBzY2FsZUZhY3RvciA9IHRoaXMuYmFzZVNjYWxlLzU7XG4gICAgICAgIHRoaXMuc2NhbGVkID0gdGhpcy5zY2FsZWQrc2NhbGVGYWN0b3I7XG4gICAgICAgIHRoaXMuem9vbUhhbmRsZXIoZXYpO1xuICAgIH1cblxuICAgIHpvb21IYW5kbGVyKGV2PyxkaXNwbGFjZW1lbnQ/KXtcblxuICAgICAgICB2YXIgdHJuczEgPSAnJztcblxuICAgICAgICBpZihkaXNwbGFjZW1lbnQpe1xuICAgICAgICAgICAgdmFyIGR4ID0gdGhpcy5iYXNlT2Zmc2V0WCArIHRoaXMubW92ZWRYICsgZGlzcGxhY2VtZW50WzBdO1xuICAgICAgICAgICAgdmFyIGR5ID0gdGhpcy5iYXNlT2Zmc2V0WSArIHRoaXMubW92ZWRZICsgZGlzcGxhY2VtZW50WzFdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGR4ID0gdGhpcy5iYXNlT2Zmc2V0WCArIHRoaXMubW92ZWRYO1xuICAgICAgICAgICAgZHkgPSB0aGlzLmJhc2VPZmZzZXRZICsgdGhpcy5tb3ZlZFk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBhZGp1c3RlZCB0byBjZW50ZXIgYXQgbW91c2UgcG9zaXRpb24gd2hpbGUgem9vbWluZ1xuXG4gICAgICAgIC8vIGlmKGV2ICYmIGV2Lm9mZnNldFgpe1xuICAgICAgICAvLyAgICAgLy8gR2V0IG1vdXNlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGNhbnZhcyBjZW50ZXIgcG9pbnQgYW5kIG1vdmVcbiAgICAgICAgLy8gICAgIHZhciBteCA9IGV2Lm9mZnNldFgtdGhpcy5jYW52YXNDZW50cm9pZFswXTtcbiAgICAgICAgLy8gICAgIHZhciBteSA9IGV2Lm9mZnNldFktdGhpcy5jYW52YXNDZW50cm9pZFsxXTtcbiAgICAgICAgLy8gICAgIHZhciBkeDIgPSBteDtcbiAgICAgICAgLy8gICAgIHZhciBkeTIgPSBteTtcbiAgICAgICAgLy8gICAgIHRybnMxID0gYHRyYW5zbGF0ZSgke2R4Mn0sJHtkeTJ9KWA7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0cm5zMSlcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHZhciBvbGRTY2FsZSA9IGQzLmRlY29tcG9zZSh0aGlzLnRyYW5zZm9ybSkuc2NhbGU7XG4gICAgICAgIHZhciBvbGRUcm5zID0gZDMuZGVjb21wb3NlKHRoaXMudHJhbnNmb3JtKS50cmFuc2xhdGU7XG4gICAgICAgIHZhciBzY2FsZSA9IGBzY2FsZSgke3RoaXMuc2NhbGVkfSwke3RoaXMuc2NhbGVkfSlgO1xuXG4gICAgICAgIHZhciB0cm5zID0gYHRyYW5zbGF0ZSgke2R4fSwke2R5fSlgO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0cmFuc2Zvcm0gYXR0cmlidXRlXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gdHJucyt0cm5zMStzY2FsZTtcbiAgICAgICAgLy8gdGhpcy50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybS5yZXBsYWNlKG9sZFNjYWxlLHNjYWxlKTtcbiAgICB9XG5cbiAgICBzZWxlY3RSb29tKGV2LCByb29tKXtcbiAgICAgICAgLy8gR2V0IGNvb3JkaW5hdGVzXG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMuc2NhbGVkO1xuICAgICAgICB2YXIgb2Zmc2V0WCA9IHRoaXMuYmFzZU9mZnNldFgrdGhpcy5tb3ZlZFg7XG4gICAgICAgIHZhciBvZmZzZXRZID0gdGhpcy5iYXNlT2Zmc2V0WSt0aGlzLm1vdmVkWTtcbiAgICAgICAgdmFyIHNjcmVlblggPSBldi5vZmZzZXRYO1xuICAgICAgICB2YXIgc2NyZWVuWSA9IGV2Lm9mZnNldFg7XG5cbiAgICAgICAgdmFyIHggPSAoc2NyZWVuWC1vZmZzZXRYKS9zY2FsZTtcbiAgICAgICAgdmFyIHkgPSAoc2NyZWVuWS1vZmZzZXRZKS9zY2FsZTtcbiAgICAgICAgdmFyIGNvb3JkaW5hdGVzID0gW3gsLXldO1xuXG4gICAgICAgIC8vIEVtaXQgZXZlbnRcbiAgICAgICAgdGhpcy5jbGlja2VkUm9vbS5lbWl0KHt1cmk6IHJvb20udXJpLCBjb29yZGluYXRlczogY29vcmRpbmF0ZXN9KTtcbiAgICB9XG5cbiAgICBvbkNhbnZhc0NsaWNrKGV2KXtcbiAgICAgICAgaWYoZXYudGFyZ2V0LmlkICE9ICdjYW52YXMnKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2xpY2tlZENhbnZhcy5lbWl0KCk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2FudmFzRXZlbnRzXScgfSlcclxuZXhwb3J0IGNsYXNzIENhbnZhc0V2ZW50c0RpcmVjdGl2ZSB7XHJcblxyXG4gIEBPdXRwdXQoKSB6b29tT3V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSB6b29tSW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG1vdmVJbml0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBtb3ZlRW5kID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBwYW5Nb2RlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhZGROb2RlTW9kZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZURvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIGRyYWdNb2RlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgY2xpY2tYO1xyXG4gIHByaXZhdGUgY2xpY2tZO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZXdoZWVsJywgWyckZXZlbnQnXSkgb25Nb3VzZVdoZWVsQ2hyb21lKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubW91c2VXaGVlbEZ1bmMoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBbJyRldmVudCddKSBvbk1vdXNlV2hlZWxGaXJlZm94KGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubW91c2VXaGVlbEZ1bmMoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignb25tb3VzZXdoZWVsJywgWyckZXZlbnQnXSkgb25Nb3VzZVdoZWVsSUUoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5tb3VzZVdoZWVsRnVuYyhldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBvbktleURvd24oZXY6S2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgIGlmKGV2LmtleSA9PSBcIkFycm93RG93blwiKXtcclxuICAgICAgICB0aGlzLnpvb21Jbi5lbWl0KGV2KTtcclxuICAgICAgfVxyXG4gICAgICBpZihldi5rZXkgPT0gXCJBcnJvd1VwXCIpe1xyXG4gICAgICAgIHRoaXMuem9vbU91dC5lbWl0KGV2KTtcclxuICAgICAgfVxyXG4gICAgICBpZihldi5rZXkgPT0gXCJBbHRcIil7XHJcbiAgICAgICAgLy8gZW5hYmxlIGRyYWcgbW9kZSBpZiBob2xkaW5nIEFsdFxyXG4gICAgICAgIHRoaXMuZHJhZ01vZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGFuTW9kZS5lbWl0KHRydWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGV2LmtleSA9PSBcIkNvbnRyb2xcIil7XHJcbiAgICAgICAgdGhpcy5hZGROb2RlTW9kZS5lbWl0KHRydWUpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXl1cCcsIFsnJGV2ZW50J10pXHJcbiAgb25LZXlVcChldjpLZXlib2FyZEV2ZW50KXtcclxuICAgICAgaWYoZXYua2V5ID09IFwiQWx0XCIpe1xyXG4gICAgICAgIC8vIGRpc2FibGUgZHJhZyBtb2RlIGlmIHJlbGVhc2luZyBBbHRcclxuICAgICAgICB0aGlzLmRyYWdNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYW5Nb2RlLmVtaXQoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGV2LmtleSA9PSBcIkNvbnRyb2xcIil7XHJcbiAgICAgICAgdGhpcy5hZGROb2RlTW9kZS5lbWl0KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgb25Nb3VzZUNsaWNrKGV2OiBNb3VzZUV2ZW50KSB7XHJcblxyXG4gICAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XHJcblxyXG4gICAgICAvLyBlbmFibGUgZHJhZyBtb2RlIGlmIGNsaWNraW5nIG1pZGRsZSBidXR0b25cclxuICAgICAgaWYoZXYuYnV0dG9uID09IDEpIHRoaXMuZHJhZ01vZGUgPSB0cnVlO1xyXG5cclxuICAgICAgaWYodGhpcy5kcmFnTW9kZSl7XHJcbiAgICAgICAgdGhpcy5jbGlja1ggPSBldi5vZmZzZXRYO1xyXG4gICAgICAgIHRoaXMuY2xpY2tZID0gZXYub2Zmc2V0WTtcclxuICAgICAgICB0aGlzLnBhbk1vZGUuZW1pdCh0cnVlKTtcclxuICAgICAgICB0aGlzLm1vdmVJbml0LmVtaXQoW2V2Lm9mZnNldFgsZXYub2Zmc2V0WV0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxyXG4gIG9uTW91c2VNb3ZlKGV2OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgIGlmKHRoaXMuZHJhZ01vZGUgJiYgdGhpcy5tb3VzZURvd24pe1xyXG4gICAgICAgICAgdGhpcy5tb3ZlLmVtaXQoW2V2Lm9mZnNldFgtdGhpcy5jbGlja1gsZXYub2Zmc2V0WS10aGlzLmNsaWNrWV0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJywgWyckZXZlbnQnXSlcclxuICBvbk1vdXNlVXAoZXY6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgaWYodGhpcy5kcmFnTW9kZSl7XHJcbiAgICAgICAgdGhpcy5kcmFnTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFuTW9kZS5lbWl0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1vdmVFbmQuZW1pdChbZXYub2Zmc2V0WC10aGlzLmNsaWNrWCxldi5vZmZzZXRZLXRoaXMuY2xpY2tZXSk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIG1vdXNlV2hlZWxGdW5jKGV2ZW50OiBhbnkpIHtcclxuICAgIHZhciBldmVudCA9IHdpbmRvdy5ldmVudCB8fCBldmVudDsgLy8gb2xkIElFIHN1cHBvcnRcclxuICAgIHZhciBkZWx0YSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCAoZXZlbnQud2hlZWxEZWx0YSB8fCAtZXZlbnQuZGV0YWlsKSkpO1xyXG4gICAgaWYoZGVsdGEgPiAwKSB7XHJcbiAgICAgICAgdGhpcy56b29tSW4uZW1pdChldmVudCk7XHJcbiAgICB9IGVsc2UgaWYoZGVsdGEgPCAwKSB7XHJcbiAgICAgICAgdGhpcy56b29tT3V0LmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgLy8gZm9yIElFXHJcbiAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgLy8gZm9yIENocm9tZSBhbmQgRmlyZWZveFxyXG4gICAgaWYoZXZlbnQucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbGFuQ29tcG9uZW50IH0gZnJvbSAnLi9wbGFuLmNvbXBvbmVudCc7XG5cbi8vIEFuZ3VsYXIgbWF0ZXJpYWxcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIFxuICAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuLy8gRGlyZWN0aXZlc1xuaW1wb3J0IHsgQ2FudmFzRXZlbnRzRGlyZWN0aXZlIH0gZnJvbSAnLi9jYW52YXMtZXZlbnRzLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1BsYW5Db21wb25lbnQsIENhbnZhc0V2ZW50c0RpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQbGFuQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQbGFuTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImQzcC5wb2x5Z29uQ2VudHJvaWQiLCJkMy5kZWNvbXBvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQWlKSSx1QkFDVSxpQkFDQTtRQURBLG9CQUFlLEdBQWYsZUFBZTtRQUNmLGlCQUFZLEdBQVosWUFBWTsyQkF6Q0UsSUFBSSxZQUFZLEVBQUU7NkJBQ2hCLElBQUksWUFBWSxFQUFFOzs2QkFTSixTQUFTOzRCQUNWLFNBQVM7eUJBVzVCLEdBQUc7MkJBQ0QsQ0FBQzsyQkFDRCxDQUFDO3lCQUdKLGVBQWEsSUFBSSxDQUFDLFdBQVcsU0FBSSxJQUFJLENBQUMsV0FBVyxnQkFBVyxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxTQUFTLE1BQUc7c0JBQ3pGLENBQUM7c0JBQ0QsQ0FBQztzQkFDRixDQUFDO3VCQUlDLEtBQUs7MkJBQ0QsS0FBSztLQU8vQjs7OztJQUVKLHVDQUFlOzs7SUFBZjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7S0FFeEI7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQzlCLElBQUksT0FBTyxZQUFTLE9BQU8sU0FBTSxZQUFZLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLFNBQU0sWUFBWSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxPQUFPLGNBQVcsT0FBTyxXQUFRLFlBQVksRUFBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLE9BQU8sY0FBVTtZQUNqQixJQUFJLENBQUMsZUFBZSxFQUFF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

/***/ }),

/***/ "./node_modules/n3/lib sync recursive ^\\.\\/N3.*$":
/*!*********************************************!*\
  !*** ./node_modules/n3/lib sync ^\.\/N3.*$ ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./N3Lexer": "./node_modules/n3/lib/N3Lexer.js",
	"./N3Lexer.js": "./node_modules/n3/lib/N3Lexer.js",
	"./N3Parser": "./node_modules/n3/lib/N3Parser.js",
	"./N3Parser.js": "./node_modules/n3/lib/N3Parser.js",
	"./N3Store": "./node_modules/n3/lib/N3Store.js",
	"./N3Store.js": "./node_modules/n3/lib/N3Store.js",
	"./N3StreamParser": "./node_modules/n3/lib/N3StreamParser.js",
	"./N3StreamParser.js": "./node_modules/n3/lib/N3StreamParser.js",
	"./N3StreamWriter": "./node_modules/n3/lib/N3StreamWriter.js",
	"./N3StreamWriter.js": "./node_modules/n3/lib/N3StreamWriter.js",
	"./N3Util": "./node_modules/n3/lib/N3Util.js",
	"./N3Util.js": "./node_modules/n3/lib/N3Util.js",
	"./N3Writer": "./node_modules/n3/lib/N3Writer.js",
	"./N3Writer.js": "./node_modules/n3/lib/N3Writer.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/n3/lib sync recursive ^\\.\\/N3.*$";

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".button-row{\r\n    position: absolute;\r\n    z-index: 100;\r\n}\r\n.button-row > button {\r\n    margin-right: 10px;\r\n}\r\n.selected {\r\n    color:red;\r\n}\r\n.drag-card{\r\n    position: absolute;\r\n    left: 100px;\r\n    top: 100px;\r\n    background-color: rgba(220,220,220,.6);\r\n    border-radius: 5px;\r\n    font-family: roboto;\r\n    font-size: 0.7em;\r\n    padding: 0px;\r\n    z-index: 110;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"button-row\">\r\n    <button \r\n        *ngFor=\"let btn of buttons\" \r\n        mat-raised-button \r\n        [disabled]=\"btn == selectedButton\"\r\n        (click)=\"switchModule(btn)\">\r\n        {{btn}}\r\n    </button>\r\n</div>\r\n\r\n<!-- ng-plan module -->\r\n<ng-plan\r\n    [hidden]=\"selectedButton != 'ng-plan'\"\r\n    [data]=\"data\"\r\n    toolbar=\"true\"\r\n    (clickedRoom)=\"roomClick($event)\"\r\n    (clickedCanvas)=\"canvasClick()\"\r\n    [selected]=\"selectedSpaces\">\r\n</ng-plan>\r\n\r\n<!-- ng-mesh-viewer module -->\r\n<ng-mesh-viewer\r\n    [hidden]=\"selectedButton != 'ng-mesh-viewer'\"\r\n    [showCentroids]=\"true\"\r\n    (clickedRoom)=\"log($event)\"\r\n    [data]=\"data\">\r\n</ng-mesh-viewer>\r\n\r\n<!-- Popups -->\r\n<div *ngIf=\"query\" ngDraggable class=\"drag-card\">\r\n    <div [innerHTML]=\"query|MarkdownToHtml\"></div>\r\n    <button mat-raised-button (click)=\"query = null\">Got it!</button>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(http, _s) {
        this.http = http;
        this._s = _s;
        this.buttons = ["ng-plan", "ng-mesh-viewer"];
        this.selectedButton = "ng-plan";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.switchModule("ng-plan");
    };
    AppComponent.prototype.switchModule = function (name) {
        var _this = this;
        this.selectedButton = name;
        if (name == "ng-plan") {
            this.http.get('./assets/test-plan.json').subscribe(function (res) {
                _this.data = res;
            });
        }
        if (name == "ng-mesh-viewer") {
            this._s.getRooms3D().subscribe(function (res) {
                _this.data = res.data;
                _this.query = res.query;
            }, function (err) { return console.log(err); });
        }
    };
    AppComponent.prototype.roomClick = function (ev) {
        this.selectedSpaces = [ev.uri];
    };
    AppComponent.prototype.log = function (ev) {
        var _this = this;
        var uri = ev.uri;
        console.log(uri);
        this._s.getType(uri).subscribe(function (res) {
            if (res == "Space") {
                _this._s.getAdjElements(uri).subscribe(function (res) {
                    _this.data = res.data;
                    _this.query = res.query;
                }, function (err) { return console.log(err); });
            }
            else {
                _this.switchModule("ng-mesh-viewer");
            }
        }, function (err) { return console.log(err); });
    };
    AppComponent.prototype.canvasClick = function () {
        this.selectedSpaces = [];
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            providers: [_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ng_plan__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-plan */ "./dist/ng-plan/fesm5/ng-plan.js");
/* harmony import */ var ng_mesh_viewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-mesh-viewer */ "./dist/ng-mesh-viewer/fesm5/ng-mesh-viewer.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_draggable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular2-draggable */ "./node_modules/angular2-draggable/fesm5/angular2-draggable.js");
/* harmony import */ var markdown_to_html_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! markdown-to-html-pipe */ "./node_modules/markdown-to-html-pipe/index.js");
/* harmony import */ var markdown_to_html_pipe__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(markdown_to_html_pipe__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// Project modules


// Angular material

// Draggable

// Markdown pipe


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                ng_plan__WEBPACK_IMPORTED_MODULE_4__["PlanModule"],
                ng_mesh_viewer__WEBPACK_IMPORTED_MODULE_5__["MeshViewerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                angular2_draggable__WEBPACK_IMPORTED_MODULE_7__["AngularDraggableModule"],
                markdown_to_html_pipe__WEBPACK_IMPORTED_MODULE_8__["MarkdownToHtmlModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.service.ts":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rdfstore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rdfstore */ "./node_modules/rdfstore/src/store.js");
/* harmony import */ var rdfstore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rdfstore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var AppService = /** @class */ (function () {
    function AppService(http) {
        this.http = http;
        // private filePaths = [
        //     "./assets/Duplex/BOT.ttl",
        //     "./assets/Duplex/classes.ttl",
        //     "./assets/Duplex/PROPS.ttl",
        //     "./assets/Duplex/geometry3d.ttl"
        // ];
        this.filePaths = [
            "./assets/OSH/BOT.ttl",
            "./assets/OSH/geometry3d.ttl",
            "./assets/OSH/classes.ttl",
            "./assets/OSH/PROPS.ttl"
        ];
    }
    AppService.prototype.getQuery = function (query) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this._loadAndQuery(query));
        // return this.http.get(this.filePaths[0], {responseType: 'text'})
    };
    AppService.prototype.getType = function (uri) {
        var q = "SELECT ?type WHERE {<" + uri + "> a ?type}";
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this._loadAndQuery(q))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            var sp = data.filter(function (d) {
                return d.type.value == "https://w3id.org/bot#Space";
            });
            if (sp.length != 0) {
                return "Space";
            }
            else {
                return "Element";
            }
        }));
    };
    AppService.prototype.getElements3D = function () {
        var q = "\n            PREFIX bot:    <https://w3id.org/bot#>\n            PREFIX props:  <https://w3id.org/props#>\n            PREFIX opm:    <https://w3id.org/opm#>\n            PREFIX schema: <http://schema.org/>\n            SELECT ?uri ?name ?geometry\n            WHERE {\n                ?uri a bot:Element ;\n                    props:identityDataName/opm:hasPropertyState ?ns ;\n                    bot:hasSimple3DModel ?geometry .\n                ?ns a opm:CurrentPropertyState ;\n                    schema:value ?name .\n            } LIMIT 20\n        ";
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this._loadAndQuery(q))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data.map(function (item) {
                return {
                    name: item.name.value,
                    uri: item.uri.value,
                    geometry: item.geometry.value
                };
            });
        }));
    };
    AppService.prototype.getAdjElements = function (spaceURI) {
        var q = "\n            PREFIX bot:    <https://w3id.org/bot#>\n\n            PREFIX props:  <https://w3id.org/props#>\n\n            PREFIX opm:    <https://w3id.org/opm#>\n\n            PREFIX schema: <http://schema.org/>\n\n            SELECT ?uri ?name ?geometry\n\n            WHERE {\n\n                <" + spaceURI + "> bot:adjacentElement ?uri .\n\n                ?uri props:identityDataName/opm:hasPropertyState ?ns ;\n\n                    bot:hasSimple3DModel ?geometry .\n\n                ?ns a opm:CurrentPropertyState ;\n\n                    schema:value ?name .\n\n            }\n        ";
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this._loadAndQuery(q))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            var d = data.map(function (item) {
                return {
                    name: item.name.value,
                    uri: item.uri.value,
                    geometry: item.geometry.value
                };
            });
            return { data: d, query: q };
        }));
    };
    AppService.prototype.getRooms3D = function () {
        var q = "\n            PREFIX bot:    <https://w3id.org/bot#>\n\n            PREFIX props:  <https://w3id.org/props#>\n\n            PREFIX opm:    <https://w3id.org/opm#>\n\n            PREFIX schema: <http://schema.org/>\n\n            SELECT ?uri ?name ?geometry\n\n            WHERE {\n\n                \t?uri a bot:Space ;\n\n                \t\tprops:identityDataName/opm:hasPropertyState ?ns ;\n\n                \t\tbot:hasSimple3DModel ?geometry .\n\n                \t?ns a opm:CurrentPropertyState ;\n\n                \t\tschema:value ?name .\n\n            }\n        ";
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this._loadAndQuery(q))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            var d = data.map(function (item) {
                return {
                    name: item.name.value,
                    uri: item.uri.value,
                    geometry: item.geometry.value
                };
            });
            return { data: d, query: q };
        }));
    };
    AppService.prototype._loadAndQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var createStorePromise, promises, _i, _a, p, promise, triples, _b, counter, _c, triples_1, t, inserted, qResPromise;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.store) return [3 /*break*/, 7];
                        createStorePromise = this._createStore();
                        promises = [];
                        for (_i = 0, _a = this.filePaths; _i < _a.length; _i++) {
                            p = _a[_i];
                            promise = this.http.get(p, { responseType: 'text' }).toPromise();
                            promises.push(promise);
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        triples = _d.sent();
                        _b = this;
                        return [4 /*yield*/, createStorePromise];
                    case 2:
                        _b.store = _d.sent();
                        counter = 0;
                        _c = 0, triples_1 = triples;
                        _d.label = 3;
                    case 3:
                        if (!(_c < triples_1.length)) return [3 /*break*/, 6];
                        t = triples_1[_c];
                        return [4 /*yield*/, this._loadTriplesInStore(this.store, t)];
                    case 4:
                        inserted = _d.sent();
                        counter += Number(inserted);
                        _d.label = 5;
                    case 5:
                        _c++;
                        return [3 /*break*/, 3];
                    case 6:
                        console.log("Added " + counter + " triples to memory.");
                        _d.label = 7;
                    case 7:
                        qResPromise = this._executeQuery(this.store, query);
                        return [2 /*return*/, qResPromise];
                }
            });
        });
    };
    AppService.prototype._createStore = function () {
        return new Promise(function (resolve, reject) {
            rdfstore__WEBPACK_IMPORTED_MODULE_1__["create"](function (err, store) {
                if (err)
                    reject(err);
                resolve(store);
            });
        });
    };
    AppService.prototype._loadTriplesInStore = function (store, triples, mimeType) {
        if (!mimeType)
            mimeType = 'text/turtle';
        return new Promise(function (resolve, reject) {
            store.load(mimeType, triples, function (err, size) {
                if (err)
                    reject(err);
                resolve(size);
            });
        });
    };
    AppService.prototype._executeQuery = function (store, query) {
        return new Promise(function (resolve, reject) {
            store.execute(query, function (err, res) {
                if (err)
                    reject(err);
                resolve(res);
            });
        });
    };
    AppService.prototype._getGraphSize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.store.graph(function (err, graph) {
                if (err)
                    reject(err);
                resolve(graph.x);
            });
        });
    };
    AppService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\MHRA\Development\Angular-libraries\ng-aec-lib\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!***********************!*\
  !*** vertx (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map