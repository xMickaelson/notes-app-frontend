import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { BreadcrumbItem } from '../models/breadcrum-item.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>(
    [],
  );
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadcrumbs();
      });
  }

  private buildBreadcrumbs(): void {
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentRoute = this.activatedRouter.root;
    let currentUrl = '';
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      currentUrl +=
        '/' +
        currentRoute.snapshot.url.map((segment) => segment.path).join('/');
      const breadcrumb = currentRoute.snapshot.data['breadcrumb'];

      if (breadcrumb) {
        breadcrumbs.push({
          label: breadcrumb,
          url: currentUrl,
        });
      }
    }
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
