import 'package:checked_mobile_application/screens/notifications.dart';
import 'package:flutter/material.dart';

import 'historic.dart';
import 'newsfeed.dart';

class UserNavigation extends StatefulWidget {

  int userId;
  String companyName;
  List membersIds;
  UserNavigation({this.userId,this.membersIds,this.companyName});
  @override
  User_NavigationState createState() => User_NavigationState();
}

class User_NavigationState extends State<UserNavigation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SizedBox(
          width: 100.0,
          height: 50.0,
          child: Container(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Image.asset('assets/checkedLogo.jpg'),
            )
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.refresh,
              color: Colors.white,
            ),
            onPressed: () async {
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: SafeArea(
          top: false,
          bottom: false,
          child: Stack(
            children: <Widget>[
              Container(
                height: MediaQuery.of(context).size.height,
                width: MediaQuery.of(context).size.width,
                child: Stack(
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Container(
                          height: MediaQuery.of(context).size.height*.5,
                          width: MediaQuery.of(context).size.width,
                          color: Colors.orange[600],
                        ),
                      ],
                    ),
                    Positioned(
                      top: MediaQuery.of(context).size.height*.4,
                      child: Container(
                        height: MediaQuery.of(context).size.height*.6,
                        width: MediaQuery.of(context).size.width,
                        decoration: BoxDecoration(
                          color:Colors.orange[300],
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(60.0),
                            topRight: Radius.circular(60.0),
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      top: 20,
                      left: MediaQuery.of(context).size.width*.5-100,
                      child: Container(
                        height: 200,
                        width: 200,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage(
                              'assets/checkedLogo.jpg'
                            )
                          )
                        ),
                      ),
                    ),
                    Positioned(
                      top: 230,
                      left: MediaQuery.of(context).size.width*.5-110,
                      child: Container(
                        height: 200,
                        width: 400,
                        child: Text(widget.companyName,style: TextStyle(
                          color: Colors.white,
                          fontSize: 40,
                          fontWeight: FontWeight.w800
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      top: MediaQuery.of(context).size.height*.415,
                      left: MediaQuery.of(context).size.width*.5-50,
                      child: Container(
                        height: 10,
                        width: 100,
                        decoration: BoxDecoration(
                          color: Colors.orange[100],
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                      ),
                    ),
                    Positioned(
                      top: MediaQuery.of(context).size.height*.5,
                      width: MediaQuery.of(context).size.width,
                      child: Container(
                        height: 250,
                        width: 200,
                        child: ListView(
                          scrollDirection: Axis.horizontal,
                          children: <Widget>[
                            SizedBox(width: 20,),
                            Stack(
                              children: <Widget>[
                                Container(
                                  width:200,
                                  height:190,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                    ),
                                    child: IconButton(
                                    onPressed: (){
                                      Navigator.push(context,MaterialPageRoute(builder: (context) => History(userId:widget.userId)));
                                    },
                                    icon: Icon(
                                      Icons.directions_run,
                                      size: 100,
                                      color: Colors.white,
                                    ),
                                  ),
                                  )
                                ),
                                Positioned(
                                  top: 200,
                                  left: 60,
                                  child: Text("Activities",style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700
                                    ),
                                  ),
                                )
                              ],
                            ),
                            SizedBox(width: 20,),
                            Stack(
                              children: <Widget>[
                                Container(
                                  width:200,
                                  height:190,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                    ),
                                    child: IconButton(
                                    onPressed: (){
                                      Navigator.push(context,MaterialPageRoute(builder: (context) => NewsFeed(userId: widget.userId,membersIds: widget.membersIds,)));
                                    },
                                    icon: Icon(
                                      Icons.library_books,
                                      size: 100,
                                      color: Colors.white,
                                    ),
                                  ),
                                  )
                                ),
                                Positioned(
                                  top: 200,
                                  left: 60,
                                  child: Text("Comments",style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700
                                    ),
                                  ),
                                )
                              ],
                            ),
                            SizedBox(width: 20,),
                            Stack(
                              children: <Widget>[
                                Container(
                                  width:200,
                                  height:190,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                    ),
                                    child: IconButton(
                                    onPressed: (){
                                      Navigator.push(context,MaterialPageRoute(builder: (context) => Notifications(widget.userId)));
                                    },
                                    icon: Icon(
                                      Icons.alarm,
                                      size: 100,
                                      color: Colors.white,
                                    ),
                                  ),
                                  )
                                ),
                                Positioned(
                                  top: 200,
                                  left: 48,
                                  child: Text("Notification",style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700
                                    ),
                                  ),
                                )
                              ],
                            ),
                            SizedBox(width: 20,),
                            Stack(
                              children: <Widget>[
                                Container(
                                  width:200,
                                  height:190,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                    ),
                                    child: IconButton(
                                    onPressed: (){},
                                    icon: Icon(
                                      Icons.person,
                                      size: 100,
                                      color: Colors.white,
                                    ),
                                  ),
                                  )
                                ),
                                Positioned(
                                  top: 200,
                                  left: 48,
                                  child: Text("Members Info",style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}