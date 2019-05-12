import { observable, action } from 'mobx';
// import { initializeInstance } from 'mobx/lib/internal';

export default class Store {
  @observable
  name = "rodney";

  @observable
  path = "";

  @observable
  listOfConfigs = [];

  @observable
  isLoading = false;

  @observable
  isSunburstDisplayed = true;

  @observable
  isSunburstZoomDisplayed = false;

  @observable
  isTreemapDisplayed = false;

  @observable
  isTreemapZoomDisplayed = false;

  @observable
  data_array = [['']];

  @observable
  beforeRoot = {};

  @observable
  isChartNavDisplayed = true;

  @observable
  isHomeSelected = true;

  @observable
  isConfigModificationSelected = false;

  @observable
  isConfigGenerationSelected = false;

  @observable
  isSunburstSelected = false;

  @observable
  isSunburstZoomSelected = false;

  @observable
  isTreemapSelected = false;

  @observable
  isTreemapZoomSelected = false;

  @observable
  isChartCardDisplayed = false;

  @observable
  isWelcomeCardDisplayed = true;

  @observable
  isWelcomeCardBottomDisplayed = true;

  @observable
  beforeTotalSize = 1334337;

  @observable
  afterTotalSize = 999999;

  @observable
  initialBuildSize = 0;

  @observable
  totalSize = 1334337;

  @observable
  chunks = 1;

  @observable
  modules = 161;

  @observable
  assets = 2;

  @observable
  isSelectJsonDisplayed = false;

  @observable
  isLoadStatsDisplayed = true;

  @observable
  isPluginsTabDisplayed = false;

  @observable
  isStatsFileGenerated = false;

  @observable
  isOptimizationSelected = false;

  @observable
  wereChartsEverDrawn = false;

  @observable
  isRootSelected = false;

  @observable
  isPreviewSelected = false;

  @observable
  isCustomConfigSaved = false;

  @observable
  isNewConfigGenerated = false;

  @observable
  totalSizeTemp = '';

  @observable
  totalNodes = 0;

  @observable
  totalAssets = 0;

  @observable
  totalChunks = 0;

  @observable
  isBuildOptimized = false;

  @observable
  isNewBuildSizeCalculated = false;

  @observable
  newTotalSize = 0;

  @observable
  newConfigDisplayCode = '';

  @observable
  isOriginalStatsGenerated = false;

  // ACTIONS //

  @action.bound
  addAge() {
    this.age++;
  }

  @action.bound
  decrementAge() {
    this.age--;
  }

  @action.bound
  resetAge() {
    this.age = 21;
  }

  @action.bound
  setPath(input) {
    this.path = input;
  }

  @action.bound
  setIsLoadingTrue() {
    this.isLoading = true;
    this.isSelectJsonDisplayed = false;
  }

  @action.bound
  setDisplaySunburstAndStats(size, node, assets, chunks) {
    this.isSunburstDisplayed = true;
    this.isSunburstZoomDisplayed = false;
    this.isTreemapDisplayed = false;
    this.isTreemapZoomDisplayed = false;

    this.isChartCardDisplayed = true;
    this.isWelcomeCardDisplayed = false;
    this.isLoadStatsDisplayed = false;
    this.isWelcomeCardBottomDisplayed = false;
    this.isSunburstSelected = true;
    this.isSunburstZoomSelected = false;
    this.isTreemapSelected = false;
    this.isTreemapZoomSelected = false;

    this.totalSizeTemp = (size / 1000000).toPrecision(3) + ' Mb'
    this.totalChunks = chunks;
    this.totalAssets = assets;
    this.totalNodes = node;
  }

  @action.bound
  setBeforeRoot(root) {
    this.beforeRoot = root;
  }

  @action.bound
  setChartNavClassOn() {
    this.isChartNavDisplayed = true;
  }

  @action.bound
  setChartNavClassOff() {
    this.isChartNavDisplayed = false;
  }

  @action.bound
  setWereChartsEverDrawn() {
    this.wereChartsEverDrawn = true;
  }

  @action.bound
  setIsNewConfigGenerated() {
    this.isNewConfigGenerated = true;
  }

  @action.bound
  setDisplaySunburst() {
    this.isSunburstDisplayed = true;
    this.isSunburstZoomDisplayed = false;
    this.isTreemapDisplayed = false;
    this.isTreemapZoomDisplayed = false;

    this.isChartCardDisplayed = true;
    this.isWelcomeCardDisplayed = false;
    this.isLoadStatsDisplayed = false;
    this.isWelcomeCardBottomDisplayed = false;
    this.isSunburstSelected = true;
    this.isSunburstZoomSelected = false;
    this.isTreemapSelected = false;
    this.isTreemapZoomSelected = false;
  }

  @action.bound
  setDisplaySunburstZoom() {
    this.isSunburstDisplayed = false;
    this.isSunburstZoomDisplayed = true;
    this.isTreemapDisplayed = false;
    this.isTreemapZoomDisplayed = false;
    this.isChartCardDisplayed = true;

    this.isSunburstSelected = false;
    this.isSunburstZoomSelected = true;
    this.isTreemapSelected = false;
    this.isTreemapZoomSelected = false;
  }

  @action.bound
  setDisplayTreemap() {
    this.isSunburstDisplayed = false;
    this.isSunburstZoomDisplayed = false;
    this.isTreemapDisplayed = true;
    this.isTreemapZoomDisplayed = false;
    this.isChartCardDisplayed = true;

    this.isSunburstSelected = false;
    this.isSunburstZoomSelected = false;
    this.isTreemapSelected = true;
    this.isTreemapZoomSelected = false;
  }

  @action.bound
  setDisplayTreemapZoom() {
    this.isSunburstDisplayed = false;
    this.isSunburstZoomDisplayed = false;
    this.isTreemapDisplayed = false;
    this.isTreemapZoomDisplayed = true;
    this.isChartCardDisplayed = true;

    this.isSunburstSelected = false;
    this.isSunburstZoomSelected = false;
    this.isTreemapSelected = false;
    this.isTreemapZoomSelected = true;
  }

  @action.bound
  setListOfConfigs(listOfConfigs) {
    this.listOfConfigs = listOfConfigs;
  }

  @action.bound
  setLoadStatsFalse() {
    this.isLoadStatsDisplayed = false;
  }

  @action.bound
  setDisplayPluginsTabTrue() {
    this.isPluginsTabDisplayed = true;
  }

  @action.bound
  setDisplayStatsFileGeneratedTrue() {
    this.isStatsFileGenerated = true;
  }

  @action.bound
  storeDataArray(data) {
    this.data_array = data;
  }

  @action.bound
  setRootSelected() {
    this.isRootSelected = true;
  }

  @action.bound
  setHomeSelected() {
    this.isHomeSelected = true;
    this.isConfigModificationSelected = false;
    this.isConfigGenerationSelected = false;
  }

  @action.bound
  setConfigModificationSelected() {
    this.isHomeSelected = false;
    this.isConfigModificationSelected = true;
    this.isConfigGenerationSelected = false;

  }

  @action.bound
  setConfigGenerationSelected() {
    this.isHomeSelected = false;
    this.isConfigModificationSelected = false;
    this.isConfigGenerationSelected = true;
  }

  @action.bound
  setCustomConfigSavedTrue() {
    this.isCustomConfigSaved = true;
  }

  @action.bound
  setIsBuildOptimized() {
    this.isBuildOptimized = true;
  }

  @action.bound
  setIsNewBuildSizeCalculated() {
    this.isNewBuildSizeCalculated = true;
  }

  @action.bound
  setNewTotalSize(newSize) {
    this.newTotalSize = newSize;
  }

  @action.bound
  setNewConfigDisplayCode(data) {
    this.newConfigDisplayCode = data;
  }

  @action.bound
  setOriginalStatsIsGenerated() {
    this.isOriginalStatsGenerated = true;
  }
}
