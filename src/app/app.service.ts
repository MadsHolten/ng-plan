import { Injectable } from '@angular/core';
import * as rdfstore from 'rdfstore';
import { Observable, from } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as THREE from 'three';

@Injectable()
export class AppService {

    // private filePaths = [
    //     "./assets/Duplex/BOT.ttl",
    //     "./assets/Duplex/classes.ttl",
    //     "./assets/Duplex/PROPS.ttl",
    //     "./assets/Duplex/geometry3d.ttl"
    // ];
    private filePaths = [
        "./assets/OSH/BOT.ttl",
        "./assets/OSH/geometry3d.ttl",
        "./assets/OSH/classes.ttl",
        "./assets/OSH/PROPS.ttl"
    ];
    private store;

    constructor( public http: HttpClient ) { }

    public getQuery(query): Observable<any> {

        return from(this._loadAndQuery(query));
        // return this.http.get(this.filePaths[0], {responseType: 'text'})

    }

    public getType(uri): Observable<any> {
        var q = `SELECT ?type WHERE {<${uri}> a ?type}`;

        return from(this._loadAndQuery(q))
            .pipe(
                map(data => {
                    var sp = data.filter(d => {
                        return d.type.value == "https://w3id.org/bot#Space";
                    });
                    if(sp.length != 0){
                        return "Space";
                    }else{
                        return "Element";
                    }
                })
            );
    }

    public getElements3D(): Observable<any> {
        var q = `
            PREFIX bot:    <https://w3id.org/bot#>
            PREFIX props:  <https://w3id.org/props#>
            PREFIX opm:    <https://w3id.org/opm#>
            PREFIX schema: <http://schema.org/>
            SELECT ?uri ?name ?geometry
            WHERE {
                ?uri a bot:Element ;
                    props:identityDataName/opm:hasPropertyState ?ns ;
                    bot:hasSimple3DModel ?geometry .
                ?ns a opm:CurrentPropertyState ;
                    schema:value ?name .
            } LIMIT 20
        `;

        return from(this._loadAndQuery(q))
                .pipe(
                    map(data => {
                        return data.map(item => {
                            return {
                                name: item.name.value, 
                                uri: item.uri.value,
                                geometry: item.geometry.value
                            }
                        })
                    })
                );
    }

    public getAdjElements(spaceURI): Observable<any> {
        var q = `
            PREFIX bot:    <https://w3id.org/bot#>\n
            PREFIX props:  <https://w3id.org/props#>\n
            PREFIX opm:    <https://w3id.org/opm#>\n
            PREFIX schema: <http://schema.org/>\n
            SELECT ?uri ?name ?geometry\n
            WHERE {\n
                <${spaceURI}> bot:adjacentElement ?uri .\n
                ?uri props:identityDataName/opm:hasPropertyState ?ns ;\n
                    bot:hasSimple3DModel ?geometry .\n
                ?ns a opm:CurrentPropertyState ;\n
                    schema:value ?name .\n
            }
        `;

        return from(this._loadAndQuery(q))
                .pipe(
                    map(data => {
                        var d = data.map(item => {
                            return {
                                name: item.name.value, 
                                uri: item.uri.value,
                                geometry: item.geometry.value
                            }
                        });
                        return {data: d, query: q};
                    })
                );
    }

    public getRooms3D(): Observable<any> {

        var q = `
            PREFIX bot:    <https://w3id.org/bot#>\n
            PREFIX props:  <https://w3id.org/props#>\n
            PREFIX opm:    <https://w3id.org/opm#>\n
            PREFIX schema: <http://schema.org/>\n
            SELECT ?uri ?name ?geometry\n
            WHERE {\n
                \t?uri a bot:Space ;\n
                \t\tprops:identityDataName/opm:hasPropertyState ?ns ;\n
                \t\tbot:hasSimple3DModel ?geometry .\n
                \t?ns a opm:CurrentPropertyState ;\n
                \t\tschema:value ?name .\n
            }
        `;

        return from(this._loadAndQuery(q))
                .pipe(
                    map(data => {
                        var d = data.map(item => {
                            return {
                                name: item.name.value, 
                                uri: item.uri.value,
                                geometry: item.geometry.value
                            }
                        });
                        return {data: d, query: q};
                    })
                );

    }

    private async _loadAndQuery(query): Promise<any> {

        // Create store and load triples if it does not already exist
        if(!this.store){

            var createStorePromise = this._createStore();
            
            // Get file content
            var promises = [];
            for(var p of this.filePaths){
                var promise = this.http.get(p, {responseType: 'text'}).toPromise();
                promises.push(promise);
            }
    
            // Continue when all triples are available and store is created
            var triples = await Promise.all(promises);
            this.store = await createStorePromise;

            // Load triples into store
            var counter = 0;
            for(var t of triples){
                var inserted = await this._loadTriplesInStore(this.store, t);
                counter+= Number(inserted);
            }

            console.log("Added " + counter + " triples to memory.");

        }

        // Query the store
        var qResPromise = this._executeQuery(this.store, query);
        
        return qResPromise;

    }

    private _createStore(){
        return new Promise( (resolve, reject) => {
            rdfstore.create((err, store) => {
                if(err) reject(err);
                resolve(store);
            });
        })
    }

    private _loadTriplesInStore(store, triples, mimeType?){
        if(!mimeType) mimeType = 'text/turtle';
        return new Promise((resolve, reject) => {
            store.load(mimeType, triples, (err, size) => {
                if(err) reject(err);
                resolve(size);
            })
        })
    }

    private _executeQuery(store, query){
        return new Promise((resolve, reject) => {
            store.execute(query, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    private _getGraphSize(){
        return new Promise((resolve, reject) => {
            this.store.graph((err, graph) => {
                if(err) reject(err);
                resolve(graph.x);
            });
        })
    }

}