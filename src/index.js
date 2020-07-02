import VeTable from './components/pub-table';
import VeTableSync from './components/pub-table-sync';

VeTable.install = function(Vue) {
  Vue.component(VeTable.name, VeTable);
};

VeTableSync.install = function(Vue) {
  Vue.component(VeTableSync.name, VeTableSync);
};

const install = function(Vue) {
  VeTable.install(Vue);
  VeTableSync.install(Vue);
};

export { install, VeTable, VeTableSync };

export default {
  install
};
