import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {DARK, GREY, RED, WHITE} from '../Organization/Colors/Color';
import CheckBox from '@react-native-community/checkbox';

const MultiSelectFilter = () => {
  const DATA = [
    {
      title: 'Status',
      data: ['Pending', 'rejected', 'Accept', 'Forwarded'],
    },
    {
      title: 'Price',
      data: ['500', '200', '100'],
    },
    {
      title: 'Daterange',
      data: ['Jan - Fab', 'March-May', 'Dec-Jan'],
    },
  ];
  const [isSelected, setSelection] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('Status');
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.item, selectedItem === item && {backgroundColor: '#ddd'}]}
      onPress={() => setSelectedItem(item)}>
      <Text style={styles.title}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.sectionHeader}>
      <CheckBox value={isSelected} onValueChange={setSelection} />
      <Text style={{fontWeight: '800', color: GREY, fontSize: 20}}>
        {title}
      </Text>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const handleTitlePress = title => {
    setSelectedTitle(title);
  };

  const selectedData = DATA.find(item => item.title === selectedTitle)?.data;
  const Line = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: GREY,
          height: 1,
          opacity: 0.3,
        }}></View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 15,
          marginVertical: 20,
        }}>
        <TouchableOpacity>
          <Text style={{color: DARK, fontWeight: '800'}}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: RED, fontWeight: '700'}}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {Line()}
      <View style={styles.container}>
        <View style={styles.titlesContainer}>
          {DATA.map(item => (
            <View style={{width: '100%', marginTop: 10}}>
              <Text
                key={item.title}
                style={[
                  styles.titleText,
                  selectedTitle === item.title && styles.selectedTitleText,
                ]}
                onPress={() => handleTitlePress(item.title)}>
                {item.title}
              </Text>
              {Line()}
            </View>
          ))}
        </View>
        <View style={styles.dataContainer}>
          <SectionList
            sections={
              selectedData ? [{title: selectedTitle, data: selectedData}] : []
            }
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            // renderSectionHeader={renderSectionHeader}
          />
        </View>
      </View>
      {Line()}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '12%',
          marginVertical: 15,
        }}>
        <TouchableOpacity>
          <Text style={{color: DARK, fontWeight: '800'}}>CLOSE</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: RED, fontWeight: '700'}}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MultiSelectFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titlesContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    padding: 5,
  },
  selectedTitleText: {
    fontWeight: 'bold',
    // backgroundColor: WHITE,
    borderRadius: 10,
    // elevation: 1,
  },
  dataContainer: {
    flex: 2,
    padding: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
});
