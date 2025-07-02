import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '../../../model/location.model';

@Component({
  selector: 'app-updatelocation',
  standalone: false,
  templateUrl: './updatelocation.html',
  styleUrl: './updatelocation.css'
})
export class Updatelocation implements OnInit{

id: string='';
l: Location = new Location();

constructor(
  private locationService: LocationService,
  private router: Router,
  private route: ActivatedRoute,
  private cdr: ChangeDetectorRef
){}
  ngOnInit(): void {
    this.loadLocationById();
  }

  loadLocationById(){
    this.id= this.route.snapshot.params['id'];
    this.locationService.getLocationById(this.id).subscribe({
      next:(res)=>{
        this.l =res;
        this.cdr.markForCheck();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  updateLocation(): void{
    this.locationService.updateLocation(this.id, this.l).subscribe({
      next:()=>{
        this.router.navigate(['/allloc'])
      },
      error:()=>{

      }
    });
  }



}
