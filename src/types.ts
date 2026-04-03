export interface NavItem {
  title: string;
  href: string;
}

export interface EducationStep {
  step: string;
  title: string;
  description: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  type: string;
}
