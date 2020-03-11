import 'dart:typed_data';

import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/screens/notifications.dart';
import 'package:checked_mobile_application/services/user_services.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:get_it/get_it.dart';

class NewsFeed extends StatefulWidget {
  int userId;
  List membersIds;
  NewsFeed({this.userId,this.membersIds});
  
  @override
  _NewsFeedState createState() => _NewsFeedState();
}

class _NewsFeedState extends State<NewsFeed> {

  UserServices get service => GetIt.I<UserServices>();

  APIResponse _apiresponse;

  _getCommentsAsync() async {
    _apiresponse = await service.getComments(widget.membersIds);
    return _apiresponse;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Comments",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          color: Colors.orange[600],
          child: Column(
            children: <Widget>[
              Container(
                color: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children:<Widget>[
                      Text("Showing filtered results",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 15.3,
                        ),
                      ),
                      IconButton(icon: Icon(Icons.filter_list), onPressed:(){})
                    ]
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Container(
                  width: MediaQuery.of(context).size.width,
                  height: MediaQuery.of(context).size.height*0.8,
                  child: FutureBuilder(
                    future: _getCommentsAsync(),
                    builder: (BuildContext context, AsyncSnapshot snapshot){
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
                          }else {
                            return  ListView.builder(
                            itemCount: snapshot.data.data.length,
                            itemBuilder: (BuildContext context, int index){
                              var timestamp=snapshot.data.data[index]["createdAt"];
                              var date = new DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
                              String rawData = (snapshot.data.data[index]["image"]);
                              Uint8List bytes;
                              var imageData;
                              if(rawData.length>1){
                                String _base64 = rawData.substring(23, rawData.length);
                                bytes = Base64Decoder().convert(_base64);
                                imageData = MemoryImage(bytes);
                              }else{
                                imageData = AssetImage("assets/checkedLogo.jpg");
                              }
                              return Padding(
                                padding: const EdgeInsets.symmetric(vertical: 5),
                                child: buildfeedbacktab(context,snapshot.data.data[index]["value"],date, imageData),
                              );
                            },
                          );
                        }
                      }
                    },
                  )
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

Card buildfeedbacktab(BuildContext context, String comment, DateTime time, dataimage) {
return Card(
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 3),
        child: Column(
          children:<Widget>[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: Row(
                children:<Widget>[
                  Padding(
                    padding: const EdgeInsets.only(top:6.0),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(40),
                        color: Colors.orange[400],
                      ),
                      height: 60.0,
                      width: 60.0,
                      child: Center(
                        child: IconButton(
                          icon: Icon(Icons.person), 
                          onPressed: (){
                            
                          },
                          color: Colors.white,
                          iconSize: 40,
                        ),
                      )
                    ),
                  ),
                  SizedBox(width: 20.0,),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children:<Widget>[
                      Text("John Smith", style: 
                        TextStyle(
                          fontWeight:FontWeight.w600,
                        ),
                      ),
                      Text(time.toString(),style: 
                        TextStyle(
                          fontWeight:FontWeight.w500,
                          color: Colors.grey[600]
                        ),
                      ),
                    ]
                  ),
                ],
              ),
            ),
            SizedBox(height: 10.0,),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Container(
                    constraints: BoxConstraints(
                      minWidth: 130,
                      maxWidth: 130,
                    ),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.orange[400]
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children:<Widget>[
                        Icon(Icons.remove_red_eye,color: Colors.white,),
                        SizedBox(width:10),
                        Text("Observation",style: 
                          TextStyle(
                            color: Colors.white
                          ),
                        )
                      ]
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height:10.0),
            Container(
              width: MediaQuery.of(context).size.width*.88,
              height: 350.0,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12.0),
                image: DecorationImage(
                  image: dataimage,
                  fit: BoxFit.cover
                )
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20,vertical:10.0),
              child: Container(
                child: Column(
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        Text("Notes",style: TextStyle(
                          fontWeight: FontWeight.w800,
                          fontSize: 15
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height:10.0),
                    Row(
                      children: <Widget>[
                        Flexible(
                          child: Text(comment,style: TextStyle(
                            fontWeight: FontWeight.w400,
                            fontSize: 15
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: <Widget>[
                        Text("",style: TextStyle(
                          fontWeight: FontWeight.w400,
                          fontSize: 15
                          ),
                        )
                      ]
                    )
                  ],
                ),
              ),
            ),
          ]
        ),
      ),
    );
  }
}