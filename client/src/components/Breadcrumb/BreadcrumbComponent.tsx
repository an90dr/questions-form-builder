import React from 'react';
import {Breadcrumb} from 'antd';
import './BreadcrumbComponent.scss';
import {SCREEN_ITEMS} from '../../types/Constants';
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import {useSelector, useDispatch} from "react-redux";
import { goToPreviousScreen, breadcrumbArray} from "../../features/breadcrumb/breadcrumbSlice";
import {ArrowLeftOutlined} from "@ant-design/icons";

interface IProps {

}

function BreadcrumbComponent(props: IProps) {
    const breadcrumbItems = useSelector(breadcrumbArray);
    const dispatch = useDispatch();

    const resolveBreadcrumbName = (screenItem: SCREEN_ITEMS): string => {
        if (screenItem == SCREEN_ITEMS.MyQuestions) {
            return 'My Questions';
        } else if (screenItem == SCREEN_ITEMS.QuizForm) {
            return 'Quiz Form';
        }
        return '';
    }

    const resolveBreadcrumbItems = (): JSX.Element => {

        return breadcrumbItems.map((screenItem: SCREEN_ITEMS, index: number) => {
            return <BreadcrumbItem
                key={index+1}
                onClick={() => {
                dispatch(goToPreviousScreen());
            }}>
                {resolveBreadcrumbName(screenItem)}
            </BreadcrumbItem>;
        });
    }

    return (
        <Breadcrumb>
            <Breadcrumb.Item
                key={0}
                href='#'
                onClick={() => {
                    dispatch(goToPreviousScreen());
            }}>
                <ArrowLeftOutlined/>
            </Breadcrumb.Item>
            {resolveBreadcrumbItems()}
        </Breadcrumb>
    );
}

export default BreadcrumbComponent;
