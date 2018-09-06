import { Component, OnInit, ViewContainerRef } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { TransactionService } from "~/shared/services/transaction.service";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "../browse/modal-view";
import { Category } from "../shared/model/category";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [ModalDialogService],
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    
    currentValue: number = 0;
    public selectedDate: Date = new Date();
    public categories: Category[] = [];
    public selectedCategory: Category;

    constructor(transactionService: TransactionService, private modalService: ModalDialogService, private vcRef: ViewContainerRef) {
        // Use the component constructor to inject providers.
        let cat = new Category();
        cat.id=1;
        cat.name='Teste';
        this.categories.push(cat);
        //this.selectedCategory = cat;
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    type(num: number) {
        this.currentValue = this.currentValue * 10 + num/100;
    }

    erase() {
        this.currentValue = (this.currentValue * 100 - (this.currentValue * 100 % 10)) / 1000;
    }

    save() {
    }

    getDate() {
        this.createModelView().then(result => {
            if (this.validate(result)) {
                this.selectedDate = result;
            }
        }).catch(error => this.handleError(error));
    }

    private createModelView(): Promise<any> {
        const today = new Date();
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };

        return this.modalService.showModal(ModalViewComponent, options);
    }

    private handleError(error: any) {
        this.selectedDate = new Date();
        alert("Please try again!");
        console.dir(error);
    }

    private validate(result: any) {
        return !!result;
    }

    changeCategory(category: Category) {
        if (this.selectedCategory == category)
            this.selectedCategory = null;
        else   
            this.selectedCategory = category;
    }
}
