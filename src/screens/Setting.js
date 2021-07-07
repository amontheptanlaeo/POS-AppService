import React from 'react'
import { View, Text , SectionList , StyleSheet , TouchableOpacity} from 'react-native'



const Setting = ({navigation}) => {
    return (
        <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'บัญชี', data: ['จัดการบัญชีผู้ใช้', 'ออกจากระบบ']},
            {title: 'สินค้า', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
            {title: 'ทั่วไป', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
            {title: 'เพิ่มเติม', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }) }>
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
     flex: 1,
     paddingTop: 22
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
