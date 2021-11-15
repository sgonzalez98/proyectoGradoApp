import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { TopCard, Content } from 'components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { endPoints, messages } from 'constantes';
import { withApi, withToast } from 'providers';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#748c94',
    padding: 5,
  },
});

const initialState = {
  data: [],
};

function Registros({ doGet, appError }) {
  const [state, setState] = useState(initialState);
  const setPrevState = (newState) => setState((prevState) => ({ ...prevState, ...newState }));

  const loadData = async () => {
    const url = `${endPoints.app.register.complete}/user/f2d5fd9d-0ea2-4ab0-8f3a-97443b4e8def`;
    const resp = await doGet({ url });
    setPrevState({ data: resp });
  };

  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      appError(error.message ? error.message : messages.dataFetch.fail);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TopCard title="Registros" iconName="clipboard-list" />
      <Content>
        {state.data.map((row, i) => (
          <View style={styles.card} key={String(i)}>
            <View style={styles.cardTitle}>
              <Icon name="pills" style={{ fontSize: 24, color: '#748c94' }} />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>{`${moment(row.date).format('YYYY-MM-DD h:mm A')} - ${row.medicineName}`}</Text>
            </View>
            <View>
              <Text>{`Cantidad: ${row.amount}`}</Text>
              <Text>{`Observación: ${row.observation}`}</Text>
            </View>
          </View>
        ))}
      </Content>
    </ScrollView>
  );
}

Registros.propTypes = {
  appError: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
};

export default withToast(withApi(Registros));
