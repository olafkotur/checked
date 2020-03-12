import 'dart:convert';

import 'dart:typed_data';

import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/screens/analysis.dart';
import 'package:checked_mobile_application/screens/feedback.dart';
import 'package:checked_mobile_application/screens/notifications.dart';
import 'package:checked_mobile_application/screens/privacyPolicy.dart';
import 'package:checked_mobile_application/screens/settings.dart';
import 'package:checked_mobile_application/services/user_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

//import 'package:tinycolor/tinycolor.dart';


import 'historic.dart';
import 'newsfeed.dart';

class UserNavigation extends StatefulWidget {

  int userId;
  String companyName;
  List membersIds;
  String logoImage;
  String theme;
  String timeZone;
  Color color1;
  var imageDatareal;
  UserNavigation({this.userId,this.membersIds,this.companyName,this.theme,this.logoImage,this.timeZone});


  @override
  User_NavigationState createState() => User_NavigationState();
}

class User_NavigationState extends State<UserNavigation> {

  UserServices get service => GetIt.I<UserServices>();

  APIResponse _apiresponse;
  set imageData(var imageData) {
    var imageDatareal = imageData;
  }

  _getsettingsAsync() async {
    _apiresponse = await service.getSettings(widget.userId.toString());
    return _apiresponse;
  }

  @override
  void initState() { 
    super.initState();
    
    widget.color1 = HexColor(widget.theme);
  
  }
  
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SizedBox(
          width: 100.0,
          height: 50.0,
          child: StreamBuilder<Object>(
            stream: null,
            builder: (context, snapshot) {
              return Container(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: widget.imageDatareal,
                )
              );
            }
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
                          color: widget.color1,
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
                    FutureBuilder(
                      future: _getsettingsAsync(),
                      builder: (BuildContext context, AsyncSnapshot snapshot) {
                        switch (snapshot.connectionState) {
                          case ConnectionState.none:
                            return Text("Doing nothing");
                          case ConnectionState.waiting:
                            return new Center(child: new CircularProgressIndicator());
                          case ConnectionState.active:
                            return Text("");
                          case ConnectionState.done:
                          if(snapshot.data.data == null){
                            return new Center(child: new CircularProgressIndicator());
                          }else{
                            String rawData = (snapshot.data.data["logoImage"]);
                              Uint8List bytes;
                              var imageData;
                              if(rawData.length>1){
                                String _base64 = rawData.substring(22, rawData.length);
                                bytes = Base64Decoder().convert(_base64);
                                imageData = MemoryImage(bytes);
                              }else{
                                imageData = AssetImage("assets/checkedLogo.jpg");
                              }
                            return Positioned(
                          top: 20,
                          left: MediaQuery.of(context).size.width*.5-100,
                          child: Container(
                            height: 200,
                            width: 200,
                            decoration: BoxDecoration(
                              image: DecorationImage(
                                image: imageData,
                              )
                            ),
                          ),
                        );
                        }
                        }
                      }
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
                                      color: widget.color1,
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
                                      color: widget.color1,
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
                                      color: widget.color1,
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
                                      color: widget.color1,
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
                                      color: widget.color1,
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
                            color:widget.color1,
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
class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}