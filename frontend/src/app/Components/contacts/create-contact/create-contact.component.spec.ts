import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, DebugElement} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {CreateContactComponent} from './create-contact.component';
import {ContactsService} from '../../../services/contacts.service';
import {Contact} from '../contact';
import config from '../../../config/contacts'
import {By} from "@angular/platform-browser";

let MockContactesArray: Array<Contact> = config.contacts

describe('CreateContactComponent', () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;
  let headerHtmlElement:HTMLElement;
  let createButnHtmlElement:HTMLElement;
  let formInputHtmlElement:HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, ReactiveFormsModule, FormsModule],
      declarations: [CreateContactComponent],
      providers: [
        ContactsService,
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    headerHtmlElement = fixture.debugElement.query(By.css('md-toolbar span')).nativeElement;
    createButnHtmlElement = fixture.debugElement.query(By.css('.create-contact-form .create-contact-submit')).nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be Title loaded "Add New Contact"', () => {
    expect(headerHtmlElement.textContent).toContain('Add New Contact')
  });

  it('should be "Create Contact" click and funciton call', () => {
    expect(createButnHtmlElement).toBeTruthy();
    expect(createButnHtmlElement.textContent).toContain('Create Contact');
  });


  it('should be create called', () => {
    spyOn(component.createNewContactEvent, 'emit');

    component.create(MockContactesArray[0]);

    expect(component.createNewContactEvent.emit).toHaveBeenCalled();
    expect(component.createNewContactEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.createNewContactEvent.emit).toHaveBeenCalledWith(MockContactesArray[0]);
  });


  it('should be create called then shuold be call changeView', () => {
    spyOn(component.createNewContactEvent, 'emit');
    spyOn(component.changeViewEvent, 'emit');

    component.create(MockContactesArray[0]);
    expect(component.changeViewEvent.emit).toHaveBeenCalled();
    expect(component.changeViewEvent.emit).toHaveBeenCalledWith(true);
  });
});
