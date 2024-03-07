import { MemberService } from './../_services/member.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MemberDto } from '../../shared/service-proxies/proxies.service';


@Injectable({
    providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<MemberDto> {

    constructor(private memberService: MemberService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<MemberDto> {
        return this.memberService.getMemberByUsername(route.paramMap.get('username'));
    }
}
