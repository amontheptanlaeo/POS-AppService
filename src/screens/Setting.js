import React from 'react'
import { View, Text , SectionList , StyleSheet , TouchableOpacity} from 'react-native'
import Colors from '../constants/colos'


const Setting = ({navigation}) => {
    return (
        <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'บัญชี', data: ['ออกจากระบบ']}
            
          ]}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => item === 'ออกจากระบบ' ? navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }) : console.log(item) }>
                  <Text style={styles.item}>{item}</Text>
              </TouchableOpacity>)
            
          }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
     flex: 0.91,
     paddingTop:10
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })

export default Setting
