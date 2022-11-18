export const DEAFULT_IMAGE: string = 'https://static.cpau.org/.newsite/images/home/principal.jpg';

export interface ContentSite {
    id: number;
    keywords?: string | null;
    showHeader?: boolean;
    breadCrumb?: any | null;
    templateId?: number | null;
    backgroundImageUrl?: string | null;
    items?: (ItemsSite)[] | null;
    childLists?: (ChildList)[] | null;
    sectionTopics?: (SectionTopicsEntity)[] | null;
    tags?: string[] | [];
    title?:string | null;
    policy?:string | null;
    contactTel?:string | null;
    contactEmail?:string | null;
    contactName?:string | null;
    content?: Content | null;
    filterApply?: string | null;
    link?: string | null;
    linkTarget: string;
}
export interface ItemsSite {
	displayOrder: number;
	highlighted: boolean;
	id: number;
	title: string;
	subTitle?: string | null;
	showTitle: boolean;
	summary: string;
	text: string;
	showPublishedDate: boolean;
	allowAnonymous: boolean;
	publishDate: string;
	publishDateString: string;
	publishDateString2: string;
	image?: Image;
	link?: string | null;
	tag?: string | null;
	tags?: string[];
	categories?: string[];
	categoryData?: string;
	linkTarget: string;
	percent: number;
  imagenesGaleria: Image[];
  posicionGaleria: number;
}
  export interface SectionTopicsEntity {
    id: number;
    title: string;
    summary?: string | null;
    link: string;
    type: number;
    linkTarget: number;
}

export interface Image {
  imageUrl?: string | null;
  fullSizeImageUrl?: string | null;
  epigraph?: string | null;
  title?: string | null;
  alternateText?: string | null;
  thumbnailUrl?: string | null;
}

export interface ChildList {
  name: string;
  description?: any;
  link: string;
  linkTarget: string;
}

export interface Content extends ItemsSite {
}

export interface BreadCrumb {
  name: string;
  link: string;
}