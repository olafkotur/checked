import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/screens/home.dart';
import 'package:checked_mobile_application/services/member_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class Member extends StatefulWidget {
  int userId;

  Member({this.userId});

  @override
  _MemberState createState() => _MemberState();
}

class _MemberState extends State<Member> {

  final _formKey = GlobalKey<FormState>();

  
  MembersServices get service => GetIt.I<MembersServices>();

  APIResponse _apiresponse;

  String _firstName = "";
  String _lastName = "";


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
              Icons.edit,
              color: Colors.black,
            ),
            onPressed: () {
              // do something
            },
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: <Widget>[
            DrawerHeader(
              child: Text(""),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomLeft,
                  end: Alignment.topRight,
                  colors: <Color>[ Colors.orange[600], Colors.orangeAccent]
                )
              ),
            ),
            InkWell(
              onTap: (){
                Navigator.pop(context);
                Navigator.pop(context);
                Navigator.pop(context);
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:10.0),
                        child: Icon(Icons.home),
                      ),
                      Text("Home",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
            SizedBox(height: 30,),
            InkWell(
              onTap: (){},
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:10.0),
                        child: Icon(Icons.wb_sunny),
                      ),
                      Text("Temperature",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
            SizedBox(height: 30,),
            InkWell(
              onTap: (){},
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:10.0),
                        child: Icon(Icons.directions_run),
                      ),
                      Text("Activity",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
            SizedBox(height: 30,),
            InkWell(
              onTap: (){},
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:10.0),
                        child: Icon(Icons.map),
                      ),
                      Text("Location",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
            SizedBox(height: 30,),
            InkWell(
              onTap: (){
                setState(() => widget.userId = 0);
                Navigator.pop(context);
                Navigator.pop(context);
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:8.0),
                        child: Icon(Icons.exit_to_app),
                      ),
                      Text("SignOut",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            )
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 66.0),
          child: Column(
            children: <Widget>[
              Center(
                child: Text("Check In A Member",style: 
                  TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(height: 20,),
              Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Text("First Name",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 4,),
                    Container(
                      child: TextFormField(
                        onChanged: (String val) => setState(() => _firstName = val),
                        validator: (value){
                          if(value.isEmpty){
                            return "Enter your First Name";
                          }
                        },
                        decoration: InputDecoration(
                          contentPadding: EdgeInsets.all(5),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Colors.grey,
                              width: 2.0
                            ),
                            borderRadius: BorderRadius.circular(5)
                          )
                        ),
                      ),
                    ),
                    SizedBox(height: 20,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Text("Last Name",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 4,),
                    Container(
                      child: TextFormField(
                        onChanged: (String val) => setState(() => _lastName = val),
                        validator: (value){
                          if(value.isEmpty){
                            return "Enter your Last Name";
                          }
                        },
                        decoration: InputDecoration(
                          contentPadding: EdgeInsets.all(5),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Colors.grey,
                              width: 2.0
                            ),
                            borderRadius: BorderRadius.circular(5)
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 20.0,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        GestureDetector(
                          onTap: () async {
                            if(_formKey.currentState.validate()){
                              _apiresponse = await service.postCreateMember(widget.userId.toString(), _firstName, _lastName);
                              print(_apiresponse.data);

                            }
                          },
                          child: Container(
                            height: 50,
                            width: 150,
                            child: Center(
                              child: Text("Check",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 23.0,
                                ),
                              )
                            ),
                            decoration: BoxDecoration(
                              color: Colors.orange[600],
                              border: Border.all(
                                width: 1
                              ),
                            ),
                          ),
                        ),
                      ],
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