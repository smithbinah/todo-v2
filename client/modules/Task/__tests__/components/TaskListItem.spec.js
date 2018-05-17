import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import TaskListItem from '../../components/TaskListItem/TaskListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const task = { checked: false, cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" };
const props = {
  task,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <TaskListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-task'));
  // TODO: validate checked field
  t.is(wrapper.find('.task-desc').first().text(), task.content);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <TaskListItem {...props} />
  );

  t.deepEqual(wrapper.prop('task'), props.task);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <TaskListItem task={task} onDelete={onDelete} />
  );

  wrapper.find('.task-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
