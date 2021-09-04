import { Injectable, NgZone } from '@angular/core'
import { Context, MagloftApi, OpenUrlRequest, ShareUrlRequest, ToggleNavigatorRequest, TrackEventRequest } from 'hpub2'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

declare global {
  interface Window {
    MagloftApi: MagloftApi
  }
}

function createObserver(zone: NgZone) {
  return new Observable<Context>((observer) => {
    if (window.MagloftApi.context) {
      observer.next(window.MagloftApi.context)
    } else {
      window.MagloftApi.onInit((context) => {
        zone.run(() => {
          observer.next(context)
        })
      })
    }
  })
}

@Injectable({ providedIn: 'root' })
export class MagloftService {
  public context?: Context
  public context$: Observable<Context>

  constructor(zone: NgZone) {
    this.context$ = createObserver(zone).pipe(tap((context) => this.context = context))
    this.context$.subscribe()
  }

  openUrl(request: OpenUrlRequest): void {
    window.MagloftApi.openUrl(request)
  }

  trackEvent(request: TrackEventRequest): void {
    window.MagloftApi.trackEvent(request)
  }

  toggleNavigator(request: ToggleNavigatorRequest): void {
    window.MagloftApi.toggleNavigator(request)
  }

  shareUrl(request: ShareUrlRequest): void {
    window.MagloftApi.shareUrl(request)
  }

  shareIssue(): void {
    window.MagloftApi.shareIssue()
  }

  close(): void {
    window.MagloftApi.close()
  }

  login(): void {
    window.MagloftApi.login()
  }

  get available() { return !!this.context }
  get deviceId() { return this.context?.deviceId }
  get appId() { return this.context?.appId }
  get locale() { return this.context?.locale }
  get country() { return this.context?.country }
  get reader() { return this.context?.reader }
  get version() { return window.MagloftApi.version }
}
