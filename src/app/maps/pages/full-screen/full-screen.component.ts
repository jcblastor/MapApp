import { Component, OnInit } from '@angular/core';
import *as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #map {
      width: 100%;
      height: 100%
    }
  `]
})
export class FullScreenComponent implements OnInit {

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -58.32776566487838, -34.71600088025387 ],
      zoom: 16
    });
  }

}
