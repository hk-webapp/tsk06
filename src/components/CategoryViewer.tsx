// import * as $ from 'jquery'
import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux';
import { InitCategoriesAction } from 'src/actions/CategoryAction';
import { ICourseCategories, ICourseInfo } from 'src/Entities/Interfaces';
import { getCategories, getCategoryLoaded, getCourseOfCategory } from 'src/reducers/CategoryReducer';
import { getCourse } from 'src/reducers/CoursesReducer';
import { IAppState } from 'src/Store/store';
import './../styles/Category.scss'
import ImageComponent from './ImageComponent';

export interface ICategoryViewerParam {
    Name: string,
}

export interface ICategoryViewerProps extends RouteComponentProps<ICategoryViewerParam> {
    categories: ICourseCategories[],
    loaded: false,
    LoadData: (name: string) => void,
    name: string,
    Course: ICourseInfo;
}

class CategoryViewer extends React.Component<ICategoryViewerProps>{

    public getCourseName() {
        return this.props.match.params.Name;
    }

    public showOnScrollImag() {

        // Detect request animation frame
        const scroll = window.requestAnimationFrame ||
            // IE Fallback
            function reqFunc(callback) { window.setTimeout(callback, 1000 / 60) };

        function loop() {
            const elementsToShow = document.querySelectorAll('.category-viewer-container .show-on-scroll');

            Array.prototype.forEach.call(elementsToShow, function applyCss(element: any) {
                if (element.complete && isElementInViewport(element)) {
                    element.classList.add('is-visible');
                }
                // else {
                //     element.classList.remove('is-visible');
                // }
            });

            scroll(loop);
        }

        // Call the loop for the first time
        loop();

        // Helper function from: http://stackoverflow.com/a/7557433/274826
        function isElementInViewport(el: any) {
            // special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
            const rect = el.getBoundingClientRect();
            // return (
            //     (rect.top <= 0
            //         && rect.bottom >= 0)
            //     ||
            //     (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
            //         rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            //     ||
            //     (rect.top >= 0 &&
            //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            // );
            return (
                (
                    (rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 2)
                    || (rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)))
            );
        }
    }

    public componentDidMount() {

        this.showOnScrollImag();
        this.props.LoadData(this.getCourseName());

    }

    public componentWillReceiveProps(props: ICategoryViewerProps) {
        if (this.props.match.params.Name !== props.match.params.Name) {
            this.props.LoadData(props.match.params.Name);
        }
    }

    public render() {
        const courseTitle = this.props.Course ? this.props.Course.Title : "";

        if (!this.props.loaded) {
            return (<div className="category-viewer-container">
                <div className="category-viewer-sider">
                    <span>{courseTitle} </span>
                </div>
                <div className="category-viewer-body">
                    loading...
            </div>
                <div className="loading" />
            </div>)
        } else {
            return (<div className="category-viewer-container">
                <div className="category-viewer-sider">
                    <span>{courseTitle} </span>
                </div>
                <div className="category-viewer-body">
                    {
                        this.props.categories.map((cat, index) => {
                            return <div className={"category-viewer-item" + this.GetClassNameByImagePosition(cat)} key={index}>
                                <div className="category-viewer-item-image-continer" >
                                    <ImageComponent name={cat.ImageUrl} category="Category" alt={cat.Title} imgClassName={"category-viewer-item-image" + (cat.ImageTheme !== 0 ? " image-frame" : "")} />
                                </div>
                                <div className="category-viewer-item-content">
                                    <h1 className="category-viewer-title">
                                        <NavLink to={"/Subject/" + this.getCourseName() + "/" + cat.Name}>{cat.Title}</NavLink>
                                    </h1>
                                    <p>{cat.Description}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>)
        }

    }

    private GetClassNameByImagePosition(cat: ICourseCategories) {
        if (cat.ImagePosition === 0) {
            return " image-top";
        }
        return (cat.ImagePosition === 1 ? " image-left" : " image-right");
    }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    categories: getCategories(state.categoriesState),
    loaded: getCategoryLoaded(state.categoriesState),
    name: getCourseOfCategory(state.categoriesState),
    // tslint:disable-next-line: object-literal-sort-keys
    Course: getCourse(state.coursesState, (ownProps as ICategoryViewerProps).match.params.Name),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    LoadData: InitCategoriesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryViewer)