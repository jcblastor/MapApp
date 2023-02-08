import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .map-container {
      width: 100%;
      height: 100%
    }

    .row {
      position: fixed;
      background-color: white;
      border-radius: 10px;
      bottom: 40px;
      left: 40px;
      padding: 5px 0;
      width: 400px;
    }

    .form-label {
      margin-bottom: 0;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{
  @ViewChild('map') divMap!: ElementRef;
  myMap!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [ -58.32776566487838, -34.71600088025387 ];

  // AfterViewInit se ejecuta despues que el elemento se crea e inicia
  // este hoock nos permite acceder al dom.
  ngAfterViewInit(): void {
    this.myMap = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.myMap.on('zoom', () => {
      this.zoomLevel = this.myMap.getZoom();
    });

    this.myMap.on('zoomend', () => {
      if(this.myMap.getZoom() > 18) {
        this.myMap.zoomTo(18);
      }
    });

    this.myMap.on('move', (e) => {
      const {lng, lat} = e.target.getCenter();
      this.center = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    this.myMap.off('zoom', () => {});
    this.myMap.off('zoomend', () => {});
    this.myMap.off('move', () => {});
  }

  zoomOut() {
    this.myMap.zoomOut();
    this.zoomLevel = this.myMap.getZoom();
  }

  zoomIn() {
    this.myMap.zoomIn();
    this.zoomLevel = this.myMap.getZoom();
  }

  changeZoom(value: string) {
    this.myMap.zoomTo(Number(value));
  }

}
