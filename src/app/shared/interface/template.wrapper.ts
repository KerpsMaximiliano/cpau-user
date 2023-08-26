import { EventEmitter } from '@angular/core';
import { ContentSite } from '../Models/contentsite.model';

export interface TemplateWrapper {
    data: ContentSite;
    changeComponent: EventEmitter<any>;
}
