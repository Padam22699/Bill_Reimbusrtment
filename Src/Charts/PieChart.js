import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {VictoryPie} from 'victory-native';
import {pi1, pi2, pi3, pi4} from '../core/theme';
const PieChart = () => {
  const graphicColor = [pi1, pi2, pi3, pi4];
  //   const wantedGraphicData = [
  //     {x: 'Cats', y: 35},
  //     {x: 'Dogs', y: 40},
  //     {x: 'Birds', y: 55},
  //   ]; // Data that we want to display

  const wantedGraphicData = [
    {x: 1, y: 2, label: '10%'},
    {x: 2, y: 3, label: '20%'},
    {x: 3, y: 6, label: '30%'},
    {x: 4, y: 5, label: '60%'},
  ];
  const defaultGraphicData = [{y: 0}, {y: 0}, {y: 100}];
  const [width, setWidth] = useState(300);
  const [heigth, setHeigth] = useState(300);
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setTimeout(() => {
      setGraphicData(wantedGraphicData);
    }, 100);
    // Setting the data that we want to display
  }, []);

  const handleClick = dataProps => {
    // if (dataProps.index == 0) {

    // }
    console.log('Hello', dataProps.index);
    setWidth(350);
    setHeigth(350);
  };
  const handleClicks = dataProps => {
    console.log('helo', dataProps.index);
    setWidth(300);
    setHeigth(300);
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <VictoryPie
          animate={{easing: 'linear'}}
          data={graphicData}
          width={width}
          height={heigth}
          colorScale={graphicColor}
          innerRadius={50}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'data',
                      mutation: dataProps => {
                        handleClick(dataProps);

                        return {};
                      },
                    },
                  ];
                },
                onPressOut: () => {
                  return [
                    {
                      target: 'data',
                      mutation: dataProps => {
                        handleClicks(dataProps);

                        return {};
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </View>
    </View>
  );
};

export default PieChart;
