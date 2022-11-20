import {Layout, Menu} from 'antd';
import React, { useState} from 'react';
import QuizContainer from "../QuizContainer/QuizContainer";
import {SCREEN_ITEMS} from "../../types/Constants";
import './Main.scss';
import {connect} from "react-redux";
import BreadcrumbComponent from "../Breadcrumb/BreadcrumbComponent";

const { Header, Content, Footer } = Layout;


interface IProps {
    breadcrumb: string
}


const mapStateToProps = (state: any) => {
    return { breadcrumb: state.breadcrumb.value };
}

function Main(props: IProps) {

    const [menuSelected, setMenuSelected] = useState<SCREEN_ITEMS>(SCREEN_ITEMS.MyQuestions);

    const menuClicked = (e: any) =>{
        setMenuSelected(e.key);
    }

    const getSelectedComponent = () => {
        if(menuSelected == SCREEN_ITEMS.MyQuestions ||
            menuSelected == SCREEN_ITEMS.QuizForm){
            return <QuizContainer/>;
        }
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={[{
                        key: 1,
                        label: 'My Questions'
                    },
                    {
                        key: 2,
                        label: 'Responses'
                    }
                    ]}
                    onClick={(e: any)=>{menuClicked(e)}}
                />



            </Header>

            <BreadcrumbComponent/>

            <Content style={{ padding: '0 50px' }}>

                <div className="site-layout-content">
                    {getSelectedComponent()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default connect(mapStateToProps)(Main);