import 'package:checked_mobile_application/screens/analysis.dart';
import 'package:checked_mobile_application/screens/feedback.dart';
import 'package:checked_mobile_application/screens/notifications.dart';
import 'package:checked_mobile_application/screens/privacyPolicy.dart';
import 'package:checked_mobile_application/screens/settings.dart';
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
              Icons.info_outline,
              color: Colors.white,
            ),
            onPressed: () async {
              Navigator.push(context,MaterialPageRoute(builder: (context) => PrivacyPolicy()));
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
                          border: Border.all(
                                        color:Colors.orange[700],
                                        width: 2,
                                      ),
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
                        height: 150,
                        width: 300,
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
                                  width:140,
                                  height:140,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(200)),
                                      border: Border.all(
                                        color:Colors.orange[700],
                                        width: 2,
                                      ),
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
                                  top: 150,
                                  left: 32,
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
                                  width:140,
                                  height:140,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                      border: Border.all(
                                        color:Colors.orange[700],
                                        width: 2,
                                      ),
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
                                  top: 150,
                                  left: 26,
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
                                  width:140,
                                  height:140,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                      border: Border.all(
                                        color:Colors.orange[700],
                                        width: 2,
                                      ),
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
                                  top: 150,
                                  left: 23,
                                  child: Text("Notifications",style: TextStyle(
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
                                  width:140,
                                  height:140,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                      border: Border.all(
                                        color:Colors.orange[700],
                                        width: 2,
                                      ),
                                    ),
                                    child: IconButton(
                                    onPressed: (){
                                      Navigator.push(context,MaterialPageRoute(builder: (context) => FeedbackForm(widget.userId)));
                                    },
                                    icon: Icon(
                                      Icons.feedback,
                                      size: 100,
                                      color: Colors.white,
                                    ),
                                  ),
                                  )
                                ),
                                Positioned(
                                  top: 150,
                                  left: 14,
                                  child: Text("Feedback Form",style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700
                                    ),
                                  ),
                                )
                              ],
                            ),
                            SizedBox(width:20,),
                            Stack(
                              children: <Widget>[
                                Container(
                                  width:140,
                                  height:140,
                                  child: Container(
                                    width: 100,
                                    height: 100,
                                    decoration: BoxDecoration(
                                      color: Colors.orange,
                                      borderRadius: BorderRadius.all(Radius.circular(100)),
                                      border: Border.all(
                                        color:Colors.orange[700],
                                        width: 2,
                                      ),
                                    ),
                                    child: IconButton(
                                    onPressed: (){
                                      Navigator.push(context,MaterialPageRoute(builder: (context) => Settings()));
                                    },
                                    icon: Icon(
                                      Icons.settings,
                                      size: 100,
                                      color: Colors.white,
                                    ),
                                  ),
                                  )
                                ),
                                Positioned(
                                  top: 150,
                                  left: 36,
                                  child: Text("Settings",style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    Positioned(
                      top: 640,
                      left: 60,
                      child: InkWell(
                        onTap: (){
                          Navigator.push(context,MaterialPageRoute(builder: (context) => AnalysisBoard()));
                        },
                        child: Container(
                          width: 300,
                          height:60,
                          decoration: BoxDecoration(
                            color:Colors.orange,
                            border: Border.all(
                              color: Colors.orange[700],
                              width: 2,
                            )
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              SizedBox(width: 20,),
                              Expanded(
                                child: Text("Analysis board",
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 20,
                                    fontWeight: FontWeight.w600
                                  ),
                                ),
                              ),
                              Icon(
                                Icons.insert_chart,
                                color: Colors.white,
                                size: 35,
                              ),
                              SizedBox(width: 20,)
                            ]
                          ),
                        ),
                      ),
                    )
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