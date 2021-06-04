import { EventEmitter } from '@angular/core';
import { ContentSite } from '../models/contentsite.model';

export interface TemplateWrapper {
    data: ContentSite;
    changeComponent: EventEmitter<any>;
}
