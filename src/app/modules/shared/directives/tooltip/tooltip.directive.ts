import { ApplicationRef, Directive, ComponentRef, ElementRef, HostListener, Injector, Input, ComponentFactoryResolver, EmbeddedViewRef, OnDestroy } from '@angular/core';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltip = '';

  private componentRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) { }

  ngOnDestroy(): void {
    this.hideTooltip();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    this.createTooltip();
    this.setTooltipPosition();
  }

  private hideTooltip(): void {
    if (!this.componentRef) return;

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = null;
  }

  private createTooltip(): void {
    if (this.componentRef) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);

    const domElement = (this.componentRef.hostView as EmbeddedViewRef<HTMLElement>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    this.componentRef.instance.tooltip = this.tooltip;
  }

  private setTooltipPosition(): void {
    if (!this.componentRef) return;

    const { left, bottom } = this.elementRef.nativeElement.getBoundingClientRect();

    this.componentRef.instance.left = left;
    this.componentRef.instance.top = bottom;
  }
}
