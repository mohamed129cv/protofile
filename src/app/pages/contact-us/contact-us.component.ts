import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import emailjs from 'emailjs-com';
import { FadeUpDirective } from "../../core/direcitve/fade-up.directive";
import { FadeLeftDirective } from "../../core/direcitve/fade-left.directive";
import { FadeRightDirective } from "../../core/direcitve/fade-right.directive";
import { BgService } from '../../core/api/bg.service';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/api/seo.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FadeUpDirective, FadeLeftDirective, FadeRightDirective],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  constructor(private _ToastrService: ToastrService, private _bg: BgService, private _seo: SeoService) {
    this.initFormControls()
    this.ititFormGrop()
  }
  TemplateId: string = 'template_qmi753q'
  PublicKey: string = 'RDPAvb5GdQ0ZPpntt'
  form!: FormGroup
  name!: FormControl
  email!: FormControl
  message!: FormControl
  bg !: string
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._seo.updateMate(
      "Get in touch with Mohammed Abdelhamid, a Digital Marketing Specialist, for collaboration, consultation, or business inquiries. Reach out via email, phone, or social media channels.",
      "Contact Us | Digital Marketing",
      " Contact, Digital Marketing, Consultation, Collaboration, Business Inquiry, Email, Social Media ,Lead Generation, Facebook Ads, Instagram Marketing, Conversion Rate, ROI, Performance Marketing ,Performance Marketing Expert, Meta Ads Specialist, Social Media Growth, Lead Generation Expert, Conversion Optimization"
    )
  }
  ngAfterViewInit(): void {
    this._bg.$theme.subscribe({
      next: res => {
        this.bg = res
      }
    })
  }
  initFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.message = new FormControl('', [Validators.required])
  }
  ititFormGrop() {
    this.form = new FormGroup({
      name: this.name,
      email: this.email,
      message: this.message
    })
  }
  submit() {
    // التحقق من صحة البنات
    if (this.form.valid) {
      // عملية الارسال
      emailjs.send(
        "mohamed",
        this.TemplateId,
        {
          name: this.form.value.name,
          email: this.form.value.email,
          message: this.form.value.message
        }, this.PublicKey
      ).then(res => {
        this._ToastrService.success('Your message has been sent successfully!', 'Success')
        this.form.reset()
      }).catch(err => {
        this.form.reset()
        this._ToastrService.error('There was an error sending your message. Please try again later.', 'Error')
      }
      )
    } else {
      this._ToastrService.error('Please fill out the form correctly.', 'Error')
      this.form.markAllAsTouched()
      Object.keys(this.form.controls).forEach(fild => this.form.controls[fild].markAsDirty())
    }
  }

  send() {
    if (this.form.valid) {
      let phone = '201029155459'
      let massage = `
     "      السلام عليكم و رحمة الله وبركاتة"

     from your website ...

     ${this.form.value.name}  

      ${this.form.value.email}  

      ${this.form.value.message}  

      `
      const encodedText = encodeURIComponent(massage);
      let url = `https://wa.me/${phone}?text=${encodedText}`
      window.open(url, '_blank')
    } else {
      this._ToastrService.error('Please fill out the form correctly.', 'Error')
      this.form.markAllAsTouched()
      Object.keys(this.form.controls).forEach(fild => this.form.controls[fild].markAsDirty())
    }
  }
}
