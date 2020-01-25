import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  // This is going to be data retrieved from the api - TODP
  final List<String> _listViewData = [
    "A List View with many Text - Here's one!",
    "A List View with many Text - Here's another!",
    "A List View with many Text - Here's more!",
    "A List View with many Text - Here's more!",
    "A List View with many Text - Here's more more!",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Image.asset('assets/checkedLogo.jpg'),
        title: Text('Checked'),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.menu,
              color: Colors.black,
            ),
            onPressed: () {
              // do something
            },
          )
        ],
      ),
      body: GridView.count(
        crossAxisCount: 2,
        padding: EdgeInsets.all(8.0),
        mainAxisSpacing: 5.0,
        children: _listViewData
          .map((data) => Card(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(15.0),
                child: Text(data),
              ),
            ),
          ))
          .toList(),
        ),
      floatingActionButton: FloatingActionButton(
        //onPressed: ,
        tooltip: 'Add a new zone',
        child: Icon(Icons.add),
      ),
    );
  }
}