import 'package:flutter/material.dart';

class Settings extends StatefulWidget {
  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {

  double _valueInterval = 10;
  double _valueMinTemp = 16;
  double _valueMaxTemp = 36;
  double _valThreshold = 0.7;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Settings",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.update,
              color: Colors.white,
            ),
            onPressed: () async {
              // update settings endpoint
            },
          ),
        ],
      ),
      body: ListView(children: <Widget>[
      ListTile(
        title: Text('App Icon'),
        leading: Icon(Icons.settings),
        trailing: Container(
          width: 50.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Expanded(
                child: new IconButton(
                  icon: new Icon(Icons.insert_photo),
                  color: Colors.black26,
                  onPressed: () {
                    // open gallery
                  },
                ),
              )
            ],
          ),
        ),
      ),
      ListTile(
        title: Text('Logo Image'),
        leading: Icon(Icons.settings),
        trailing: Container(
          width: 50.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Expanded(
                child: new IconButton(
                  icon: new Icon(Icons.insert_photo),
                  color: Colors.black26,
                  onPressed: () {
                    // open gallery
                  },
                ),
              )
            ],
          ),
        ),
      ),
      SwitchListTile(
        value: false,
        title: Text("Dark mode"),
        secondary: Icon(Icons.settings),
        onChanged: (value) {},
      ),
      ListTile(
        title: Text('Time Zone'),
        leading: Icon(Icons.settings),
        trailing: Container(
          width: 150.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Expanded(
                flex: 3,
                child: TextField(
                  textAlign: TextAlign.end,
                  decoration: InputDecoration.collapsed(hintText: 'UTC+00'),
                ),
              ),
            ],
          ),
        ),
      ),
      ListTile(
        title: Text('Theme Colour'),
        leading: Icon(Icons.settings),
        trailing: Container(
          width: 150.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Expanded(
                flex: 3,
                child: TextField(
                  textAlign: TextAlign.end,
                  decoration: InputDecoration.collapsed(hintText: '#ffffffff'),
                ),
              ),
            ],
          ),
        ),
      ),
      ListTile(
        title: Text('Notifications'),
        leading: Icon(Icons.settings),
        trailing: Container(
          width: 50.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Expanded(
                child: new IconButton(
                  icon: new Icon(Icons.arrow_drop_down),
                  color: Colors.black26,
                ),
              ),
            ],
          ),
        ),
      ),
      ListTile(
        title: Text('Interval'),
        trailing: Container(
          width: 250.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  activeTrackColor: Colors.orange[700],
                  inactiveTrackColor: Colors.orange[100],
                  trackShape: RectangularSliderTrackShape(),
                  trackHeight: 4.0,
                  thumbColor: Colors.orangeAccent,
                  thumbShape: RoundSliderThumbShape(enabledThumbRadius: 12.0),
                  overlayColor: Colors.orange.withAlpha(32),
                  overlayShape: RoundSliderOverlayShape(overlayRadius: 28.0),
                  tickMarkShape: RoundSliderTickMarkShape(),
                  activeTickMarkColor: Colors.orange[700],
                  inactiveTickMarkColor: Colors.orange[100],
                  valueIndicatorShape: PaddleSliderValueIndicatorShape(),
                  valueIndicatorColor: Colors.orangeAccent,
                  valueIndicatorTextStyle: TextStyle(
                    color: Colors.white,
                  ),
                ),
                child: Slider(
                  value: _valueInterval,
                  min: 0,
                  max: 100,
                  divisions: 100,
                  label: '$_valueInterval',
                  onChanged: (value) {
                    setState(
                      () {
                        _valueInterval = value;
                      },
                    );
                  },
                ),
              ),
              Expanded(
                flex: 3,
                child: TextField(
                  textAlign: TextAlign.end,
                  decoration: InputDecoration.collapsed(hintText: '$_valueInterval'),
                ),
              ),
            ],
          ),
        ),
      ),
      ListTile(
        title: Text('Min Temperature'),
        trailing: Container(
          width: 250.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  activeTrackColor: Colors.orange[700],
                  inactiveTrackColor: Colors.orange[100],
                  trackShape: RectangularSliderTrackShape(),
                  trackHeight: 4.0,
                  thumbColor: Colors.orangeAccent,
                  thumbShape: RoundSliderThumbShape(enabledThumbRadius: 12.0),
                  overlayColor: Colors.orange.withAlpha(32),
                  overlayShape: RoundSliderOverlayShape(overlayRadius: 28.0),
                  tickMarkShape: RoundSliderTickMarkShape(),
                  activeTickMarkColor: Colors.orange[700],
                  inactiveTickMarkColor: Colors.orange[100],
                  valueIndicatorShape: PaddleSliderValueIndicatorShape(),
                  valueIndicatorColor: Colors.orangeAccent,
                  valueIndicatorTextStyle: TextStyle(
                    color: Colors.white,
                  ),
                ),
                child: Slider(
                  value: _valueMinTemp,
                  min: 0,
                  max: 100,
                  divisions: 100,
                  label: '$_valueMinTemp',
                  onChanged: (value) {
                    setState(
                      () {
                        _valueMinTemp = value;
                      },
                    );
                  },
                ),
              ),
              Expanded(
                flex: 3,
                child: TextField(
                  textAlign: TextAlign.end,
                  decoration: InputDecoration.collapsed(hintText: '$_valueMinTemp'),
                ),
              ),
            ],
          ),
        ),
      ),
      ListTile(
        title: Text('Max Temperature'),
        trailing: Container(
          width: 250.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  activeTrackColor: Colors.orange[700],
                  inactiveTrackColor: Colors.orange[100],
                  trackShape: RectangularSliderTrackShape(),
                  trackHeight: 4.0,
                  thumbColor: Colors.orangeAccent,
                  thumbShape: RoundSliderThumbShape(enabledThumbRadius: 12.0),
                  overlayColor: Colors.orange.withAlpha(32),
                  overlayShape: RoundSliderOverlayShape(overlayRadius: 28.0),
                  tickMarkShape: RoundSliderTickMarkShape(),
                  activeTickMarkColor: Colors.orange[700],
                  inactiveTickMarkColor: Colors.orange[100],
                  valueIndicatorShape: PaddleSliderValueIndicatorShape(),
                  valueIndicatorColor: Colors.orangeAccent,
                  valueIndicatorTextStyle: TextStyle(
                    color: Colors.white,
                  ),
                ),
                child: Slider(
                  value: _valueMaxTemp,
                  min: 0,
                  max: 100,
                  divisions: 100,
                  label: '$_valueMaxTemp',
                  onChanged: (value) {
                    setState(
                      () {
                        _valueMaxTemp = value;
                      },
                    );
                  },
                ),
              ),
              Expanded(
                flex: 3,
                child: TextField(
                  textAlign: TextAlign.end,
                  decoration: InputDecoration.collapsed(hintText: '$_valueMaxTemp'),
                ),
              ),
            ],
          ),
        ),
      ),
      ListTile(
        title: Text('Threshold'),
        trailing: Container(
          width: 250.0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  activeTrackColor: Colors.orange[700],
                  inactiveTrackColor: Colors.orange[100],
                  trackShape: RectangularSliderTrackShape(),
                  trackHeight: 4.0,
                  thumbColor: Colors.orangeAccent,
                  thumbShape: RoundSliderThumbShape(enabledThumbRadius: 12.0),
                  overlayColor: Colors.orange.withAlpha(32),
                  overlayShape: RoundSliderOverlayShape(overlayRadius: 28.0),
                  tickMarkShape: RoundSliderTickMarkShape(),
                  activeTickMarkColor: Colors.orange[700],
                  inactiveTickMarkColor: Colors.orange[100],
                  valueIndicatorShape: PaddleSliderValueIndicatorShape(),
                  valueIndicatorColor: Colors.orangeAccent,
                  valueIndicatorTextStyle: TextStyle(
                    color: Colors.white,
                  ),
                ),
                child: Slider(
                  value: _valThreshold,
                  min: 0,
                  max: 100,
                  divisions: 100,
                  label: '$_valThreshold',
                  onChanged: (value) {
                    setState(
                      () {
                        _valThreshold = value;
                      },
                    );
                  },
                ),
              ),
              Expanded(
                flex: 3,
                child: TextField(
                  textAlign: TextAlign.end,
                  decoration: InputDecoration.collapsed(hintText: '$_valThreshold'),
                ),
              ),
            ],
          ),
        ),
      ),
    ]),
    );
  }
}