import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header/Header';


test('renders the header properly', t => {
  const router = {
    isActive: sinon.stub().returns(true),
  };
  const wrapper = shallow(
    <Header switchLanguage={() => {}} />,
    {
      context: {
        router,
      },
    }
  );

  t.is(wrapper.find('a').length, 1);
});
