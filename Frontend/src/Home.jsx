import React from "react";
import axiosInstance from "./axios";
import homestyle from "./CSS/Home.module.scss";
import burger from "./CSS/images/burger-menu-icon-17.jpg";
import EditIcon from '@mui/icons-material/Edit';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Alert, AppBar, Autocomplete, Box, Button, CardMedia, Card ,IconButton, Menu, MenuItem, Snackbar, TextField, Toolbar, Typography } from '@mui/material'
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import history from './history';
import css from './CSS/Search.module.scss';
//import * as SockJS from "sockjs-client";
import SockJS from "sockjs-client/dist/sockjs"
import * as Stomp from "stompjs";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

class Home extends React.Component {


    constructor() {
        super()
        this.state = {
            actor: [],
            devices:[]
        }
    };



    handle = (selected) => {
        const to = '/' + selected;
        if (location.pathname !== to) {
            if(to == '/log-in')
            {
                axiosInstance.post("/logout", localStorage.getItem('USER_ID'))
                .then(
                    res => {
                        
                    }
                )
                .catch(error => {
                    console.log(error)
                })
                localStorage.removeItem('USER_ID');
                console.log(to);
                history.push(to);
                window.location.reload();
            }else
            {
                if(to=="/home" && localStorage.getItem("user")=="admin@gmail.com")
                {
                    console.log(to);
                    history.push("/admin");
                    window.location.reload();
                }else
                {
                console.log(to);
                history.push(to);
                window.location.reload();
                }
               
            }
           
        }
    }



    componentDidMount(){
        axiosInstance.post("/getFavActor")
        .then(
            res => {
                const val = res.data;
                    
                this.setState(
                {
                    actor: val
                }       
                );
                console.log(val);
                console.log(this.state);
            }
        )
        .catch(error => {
            console.log(error)
        })


        axiosInstance.post("/getAllMovies")
        .then(
            res => {
                const val = res.data;
                
                this.setState(
                    {
                        devices: val
                    }       
                );
                console.log(val);
                //console.log(this.state);
            }
        )
        .catch(error => {
            console.log(error)
        })



        this.connect();

    }



    
    connect() {
        console.log("In Connect");
        const URL = "http://localhost:8080/socket";
        const websocket = new SockJS(URL);
        const stompClient = Stomp.over(websocket);
        stompClient.connect({}, frame => {
            console.log("Conectat la " + frame);
            stompClient.subscribe("/topic/socket/device", notification => {
                let message = notification.body;
                console.log("ajunge aici");
                console.log(message);
                alert(message);

            })
        })
    }
    

    render() {
        return (
                <div className={homestyle.homebody}>
                    
                       
                    <SideNav
                             onSelect={this.handle}

                            >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="home">
                                <NavItem eventKey="home">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Home
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="mylist">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        My List
                                    </NavText>
                                </NavItem>
                               
                                <NavItem eventKey="log-in">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Log Out
                                    </NavText>
                                </NavItem>
                               
                            </SideNav.Nav>
                        </SideNav>

            




                        <div className="page-wrap">
                            <div className="jumbotron">
                            <div style={{marginTop: '130px'}} className="container">
                             
                                <a href="#" className="h5 close-menu"><i style={{color: '#fff', position: 'relative', bottom: '120px', cursor: 'pointer'}} className="fa fa-times fa-2x fa-fw" /></a>
                                <h1>Filmento</h1>
                                <div className="spacer" />
                                <hr />
                                <hr />
                                <h2 className="text-center">The best place for devices</h2>
                            </div>
                            </div>
                            <div className="section" id="about">
                            <h1>About</h1>
                            <hr />
                            </div>
                            <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                <div className="well">
                                    <h3>Filmento</h3>
                                    <p>A place for cinematografy and cinephiles, where you can share your opinions about devices , rate them , get all kind of information about them , and recieve great recomandations and news</p>
                                </div>
                                </div>
                            </div>
                            {/*/.row*/}
                            </div>
                            {/*/.container*/}
                            <div className="section" id="what-i-do">
                            <h1>Browse Movies</h1>
                            <hr />
                            </div>
                            <div className="containerTest">
                            <div id="idtestioana">
                                <div className="slideshow-containerTest">
                                
                            
                                <br />
                            
                                </div>
                            </div>
                            {/*/.row*/}
                            </div>
                            {/*/.container*/}
                            <div className="work visible-lg" style={{height: '250px !important'}}>
                            <div className="container">
                                <div className="row">
                                <div className="col-md-3">
                                    <h3><i className="fa fa-code" />&nbsp; Samuel L. Jackson</h3>
                                    <p>Samuel Leroy Jackson (born December 21, 1948) is an American actor and producer. One of the most widely recognized actors of his generation, the films in which he has appeared have collectively grossed over $27 billion worldwide, making him the highest-grossing actor of all time .</p>
                                </div>
                                <div className="col-md-3">
                                    <h3><i className="fa fa-fighter-jet" />&nbsp;Ryan Reynolds</h3>
                                    <p>Ryan Rodney Reynolds (born October 23, 1976) is a Canadian actor and film producer. He began his career starring in the Canadian teen soap opera Hillside (1991 - 1993), and had minor roles before landing the lead role on the sitcom Two Guys and a Girl between 1998 and 2001.</p>
                                </div>
                                <div className="col-md-3">
                                    <h3><i className="fa fa-arrows-alt" />&nbsp; Elizabeth Olsen</h3>
                                    <p>Elizabeth Chase Olsen (born February 16, 1989) is an American actress. Born in Sherman Oaks, California, Olsen began acting at age four. She starred in her debut film role in the thriller Martha Marcy May Marlene in 2011, for which she was acclaimed and nominated for a Critics' Choice Movie Award </p>
                                </div>
                                <div className="col-md-3">
                                    <h3><i className="fa fa-bolt" />&nbsp;Gal Gadot</h3>
                                    <p>Gal Gadot-Varsano born 30 April 1985 is an Israeli actress and model. At age 18, she was crowned Miss Israel 2004. She then served two years in the Israel Defense Forces as a soldier, whereafter she began studying at the IDC Herzliya college, while building her modeling and acting careers.</p>
                                </div>
                                </div>
                                {/*/.row*/}
                            </div>


                        <br />
                         

                                <Card className={css.box_for_showing_fava} key={this.state.actor.id} sx={{border:2, borderColor: 'white'}} >
                                    <Box >
                                    <CardMedia
                                    component="img"
                                    height="180"
                                    image={this.state.actor.imagePath}
                                />
                                    </Box>
                                    <Box sx={{borderTop:2, borderColor: 'black'}} >{this.state.actor.nume}
                                    </Box>
                                    <Box  >{this.state.actor.varsta}</Box>
                                    
                                    <Button onClick={()=>this.handleClickActor(this.state.actor.id)}>SHOW</Button>
                                </Card>
                            
                       


                            {/*/.container*/}
                            </div>
                            {/*/.work*/}
                            {/*mobile work*/}
                            <div className="container hidden-lg">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="well">
                                    <h3><i className="fa fa-code" />&nbsp;Victoria Pedretti</h3>
                                    <p>Victoria Pedretti (born March 23, 1995) is an American actress. Recognized as a modern scream queen, she is known for her portrayals of disturbed, villainous characters. Her accolades include an MTV Award and nominations for two Critics' Choice Awards and a Saturn Award.</p>
                                </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="well">
                                    <h3><i className="fa fa-fighter-jet" />&nbsp; Will Smith</h3>
                                    <p>Willard Carroll Smith Jr. (born September 25, 1968) is an American actor, rapper, and film producer. Smith has been nominated for five Golden Globe Awards and two Academy Awards, and has won four Grammy Awards.</p>
                                </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="well">
                                    <h3><i className="fa fa-arrows-alt" />&nbsp; Jackie Chan</h3>
                                    <p>Datuk Fang Shilong[4][5] (Chinese: 房仕龍;[6] born 7 April 1954)[7] SBS[8] MBE[9] PMW,[10] born Chan Kong-sang (Chinese: 陳港生 About this soundlisten) and known professionally as Jackie Chan, is a Hong Kong actor, director, martial artist and stuntman known for his slapstick acrobatic fighting style, comic timing, and innovative stunts, which he typically performs himself</p>
                                </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="well">
                                    <h3><i className="fa fa-bolt" />&nbsp; Freya Allan</h3>
                                    <p>Freya Allan (born 6 September 2001) is an English actress. She is best known for her role as Princess Cirilla of Cintra in the Netflix series The Witcher and appears as young Sam in the 2021 film Gunpowder Milkshake.</p>
                                </div>
                                </div>
                            </div>
                            {/*/.row*/}
                            </div>
                            {/*/.container and mobile work*/}
                            <div className="section" id="work">
                            <h1>Recent Movies</h1>
                            <hr />
                            </div>
                            <div className="container">
                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlaySpeed={3000}
                                centerMode={false}
                                className=""
                                containerClass="container-with-dots"
                                dotListClass=""
                                draggable
                                focusOnSelect={false}
                                infinite
                                itemClass=""
                                keyBoardControl
                                minimumTouchDrag={80}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                responsive={{
                                    desktop: {
                                    breakpoint: {
                                        max: 3000,
                                        min: 1024
                                    },
                                    items: 3,
                                    partialVisibilityGutter: 40
                                    },
                                    mobile: {
                                    breakpoint: {
                                        max: 464,
                                        min: 0
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 30
                                    },
                                    tablet: {
                                    breakpoint: {
                                        max: 1024,
                                        min: 464
                                    },
                                    items: 2,
                                    partialVisibilityGutter: 30
                                    }
                                }}
                                showDots={false}
                                sliderClass=""
                                slidesToSlide={1}
                                swipeable
                                >
                                { this.state.devices.map(m=>(
                                    <Card key={m.id} sx={{border:2, borderColor: 'white'}} >
                                    <Box >
                                    <CardMedia
                                    component="img"
                                    height="180"
                                    image={m.imagePath}
                                />
                                    </Box>
                                    <Box sx={{borderTop:2, borderColor: 'black'}} >{m.numeM}
                                    </Box>
                                    <Box  >{m.gen}</Box>
                                    
                                   
                                </Card>
                                ))
                               
                                }
                                </Carousel>
                            {/*/.row*/}
                            </div>
                            {/*/.container*/}
                            {/*<div class="hidden-xs"><div class="work-together" id="contact">LETS WORK TOGETHER</div></div>*/}
                            <div className="section" id="contact">
                            <h1>Enjoy !!!</h1>
                            <hr />
                            </div>
                        </div>
                        {/*/.page-wrap*/}
                </div>

        )
    }

}

export default Home;