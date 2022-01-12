import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.ozan.css'],
  encapsulation: ViewEncapsulation.None
}
)



export class AppComponent implements OnInit {
  ownerVar: string;
  listExperiences: Experience[] = [];
  selectedExp: string;
  currentExperience: Experience | undefined;

  listEducations: Education[] = [];
  selectedEducation: string;
  currentEducation: Education | undefined;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  pdfSourceList = [
    { label: "Oracle Database SQL Certified Associate", path: "/assets/certificates/eCertificate.pdf" },
    { label: "Oracle SQL Tuning for Developers Workshop", path: "/assets/certificates/Oracle certificate.pdf" },
    { label: "Microsoft Certified Professional", path: "/assets/certificates/Ozan Seçkin - Microsoft Certified Professional.pdf" },
    { label: "Microsoft Certified Solution Developer", path: "/assets/certificates/Ozan Seçkin - Microsoft Certified Solution Developer.pdf" },
    { label: "TOEFL", path: "/assets/certificates/TOEFL_PUAN.pdf" },
    { label: "Android Application Development", path: "/assets/certificates/Android Application Development.pdf" },
    { label: "Best Graduation Project", path: "/assets/certificates/Best Graduation Project.pdf" }];

  courseEventList = [
    { eventName: "Oracle Open World 2019", location: "San Francisco", year: "2019", type: "Event", tooltip: "Oracle OpenWorld is an annual Oracle convention for business decision-makers, IT management, and line-of-business end users. It is held in September in San Francisco" },
    { eventName: "Big Data", location: "Istanbul", year: "2018", type: "Course", tooltip: "Course from Zekeriya Besiroglu" },
    { eventName: "Android Application Development", location: "Istanbul", year: "2017", type: "Course", tooltip: "Android Application Development course from Bilginc Academy" },
    { eventName: "Gartner Symposium ITxpo Seminar", location: "London", year: "2017", type: "Event", tooltip: "This event delivers independent and objective content with the authority and weight of the world’s leading IT research and advisory organization, and provides access to the latest solutions from key technology providers." },
    { eventName: "Oracle ADF", location: "Istanbul", year: "2017", type: "Course", tooltip: "Course for Oracle ADF" },
    { eventName: "PL/SQL Tuning", location: "Istanbul", year: "2017", type: "Course", tooltip: "Oracle SQL Tuning for Developers Workshop from Oracle University certified educators" },
    { eventName: "Internet of Things", location: "Istanbul", year: "2016", type: "Course", tooltip: "Daily seminar about Internet of Things" }];

   skillList =["PL/SQL", "Exadata", "SQL-Loader", "MsSQL", "Data Structures","OOAD (Object Oriented Analysis Design)", "XML", "TOAD", "ADF", "C#", "Asp.Net", "Biztalk", "Agile", "Scrum", "Kanban", "Visual Studio", "SQL_Server", "Java", "Javascript"]; 


  selectExperience(item: Experience) {
    this.currentExperience = item;

    for (let expItem of this.listExperiences) {
      if (expItem.companyName != item.companyName) {
        expItem.highlight = false;
      }
      else { expItem.highlight = true; }
    }
  }

  selectEducation(item: Education) {
    this.currentEducation = item;

    for (let eduItem of this.listEducations) {
      if (eduItem.schoolName != item.schoolName) {
        eduItem.highlight = false;
      }
      else { eduItem.highlight = true; }
    }
  }


  constructor(private http: HttpClient) {
    this.ownerVar = "Ozan Seçkin";
    this.selectedExp = '';
    this.selectedEducation = '';
  }

  ngOnInit(): void {
    this.http.get<Experience[]>('../assets/experience-data.json').subscribe(data => this.listExperiences = data)
    this.http.get<Education[]>('../assets/education-data.json').subscribe(data => this.listEducations = data)
  }

}

export interface Experience {
  companyName: string;
  companyShortName: string;
  jobTitle: string;
  jobDate: string;
  jobDescription: string;
  highlight: boolean;
};

export interface Education {
  schoolName: string;
  schoolShortName: string;
  fieldOfStudy: string;
  educationDate: string;
  cgpa: string;
  location: string;
  highlight: boolean;
  degreePath: string;
};