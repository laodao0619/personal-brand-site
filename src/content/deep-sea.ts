// Display depths are representative positions or explicitly labelled observations,
// not universal limits. Sources are linked on every card. Checked 2026-11-26.
export const MAX_DEPTH = 10935;
export const zones = [
  { depth: 0, name: '阳光层', english: 'SUNLIGHT', range: '0–200 米', text: '光落进水里，日常的尺度开始改变。' },
  { depth: 200, name: '黄昏层', english: 'TWILIGHT', range: '200–1,000 米', text: '阳光逐渐退场。把目光留给微弱的光点。' },
  { depth: 1000, name: '午夜层', english: 'MIDNIGHT', range: '1,000–4,000 米', text: '来自海面的阳光，到这里已经消失。' },
  { depth: 4000, name: '深渊层', english: 'ABYSS', range: '4,000–6,000 米', text: '在辽阔的黑暗里，留一点时间给空白。' },
  { depth: 6000, name: '超深渊层', english: 'HADAL', range: '6,000 米以下', text: '海沟继续向下。生命仍然没有退场。' },
];
export type Encounter = { depth: number; name: string; latin?: string; text: string; evidence: string; url: string; shape: string; kind?: 'landmark'; color?: string };
export const encounters: Encounter[] = [
  { depth: 4400, name: '冠水母', latin: 'Atolla', shape: 'crown', color: '#a9c8f1', text: '受惊时，它能发出蓝色生物光，像黑暗中的警报。', evidence: '展示位置 4,400 米；WHOI 所列分布约 500–4,500 米。', url: 'https://www.whoi.edu/ocean-learning-hub/ocean-facts/atolla-jellyfish/' },
  { depth: 3, name: '宽吻海豚', latin: 'Tursiops truncatus', shape: 'dolphin', text: '近岸种群穿行于海湾与潮汐水道，也会来到很浅的水域。', evidence: '近岸种群常见于 3 米或更浅水域；不是整个物种的潜水极限。', url: 'https://seaworld.org/animals/all-about/bottlenose-dolphin/habitat/' },
  { depth: 20, name: '绿海龟', latin: 'Chelonia mydas', shape: 'turtle', color: '#b4ddbc', text: '背着一块安静的绿，在浅海里游过。', evidence: 'NOAA 汇总：亚成体常规下潜约 20 米。', url: 'https://www.fisheries.noaa.gov/s3/2023-01/FINAL_EA_%20RIR_FRFA%20%20MMPA%20Import%20Rule%20Version%208_1_16%20with%20appendices%20-%20Kris%20Gamble%20-%20NOAA%20Federal%20-508.pdf' },
  { depth: 40, name: '翻车鱼', latin: 'Mola mola', shape: 'sunfish', text: '像一枚被海水磨圆的月亮，缓慢经过。', evidence: 'MBARI 影像记录：40 米（视频 3:25）；并非最大下潜深度。', url: 'https://www.youtube.com/watch?v=2m7Z65UFj8o' },
  { depth: 65, name: '大白鲨', latin: 'Carcharodon carcharias', shape: 'shark', text: '它常在近岸上层水域活动，也能走向更深的海。', evidence: '展示位置 65 米；记录范围从海面到超过 1,300 米。', url: 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/white-shark/' },
  { depth: 90, name: '蓝鲨', latin: 'Prionace glauca', shape: 'shark', color: '#8abdf2', text: '细长的胸鳍，像为远行展开的双翼。', evidence: '展示位置 90 米；资料所列深度为海面至 350 米。', url: 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/blue-shark/' },
  { depth: 100, name: '腔棘鱼', latin: 'Latimeria chalumnae', shape: 'fish', text: '肉质的鳍连接着身体，也连接着一段漫长的演化史。', evidence: '澳大利亚博物馆记载：2007 年桑给巴尔标本采自约 100 米。', url: 'https://australian.museum/learn/animals/fishes/coelacanth-latimeria-chalumnae-smith-1939/' },
  { depth: 170, name: '皇带鱼', latin: 'Regalecus glesne', shape: 'ribbon', color: '#efb2bb', text: '银色身体拖出一条长带；报道的最大体长约 11 米。', evidence: '展示位置 170 米；常见于 200 米以内，也有至 1,000 米的记录。体长不是水深。', url: 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/oarfish/' },
  { depth: 214, name: '一口气的历史刻度', kind: 'landmark', shape: 'diver', text: '2007 年，Herbert Nitsch 完成 214 米无限制自由潜水。这个项目借助配重滑架和上浮装置。', evidence: 'Guinness：AIDA 认证的男子无限制自由潜水纪录；不能与恒重项目混为一谈。', url: 'https://www.guinnessworldrecords.com/world-records/freediving-no-limit-men' },
  { depth: 332.35, name: '水肺潜水 · 332.35 米', kind: 'landmark', shape: 'diver', text: '2014 年，Ahmed Gabr 在红海达哈卜创造了这一水肺潜水纪录。', evidence: 'Guinness 纪录及复核说明。这里只作尺度对照。', url: 'https://www.guinnessworldrecords.com/news/announcement/deepest-scuba-dive' },
  { depth: 480, name: '太平洋蝰鱼', latin: 'Chauliodus macouni', shape: 'viper', text: '细长的獠牙，让这张小小的嘴显得格外醒目。', evidence: '展示位置 480 米；MBARI 所列深度 200–1,500 米。', url: 'https://www.mbari.org/animal/pacific-viperfish/' },
  { depth: 650, name: '管眼鱼', latin: 'Macropinna microstoma', shape: 'barreleye', color: '#a2e5cb', text: '透明的头罩里，两只管状眼睛朝向上方。', evidence: '展示位置 650 米；MBARI 所列深度 460–800 米。', url: 'https://www.mbari.org/animal/barreleye-fish/' },
  { depth: 780, name: '吸血鬼乌贼', latin: 'Vampyroteuthis infernalis', shape: 'squid', color: '#d2a1bd', text: '名字很凶，食谱却包含缓缓飘落的海洋雪。', evidence: '展示位置 780 米；MBARI 所列深度 600–900 米。', url: 'https://www.mbari.org/animal/vampire-squid/' },
  { depth: 900, name: '大王乌贼', latin: 'Architeuthis', shape: 'squid', color: '#d0b1a2', text: '长长的触腕伸向黑暗，第一次野外活体照片让它不再只是传说。', evidence: '2004 年野外观测发生在 900 米；原始研究发表于 2005 年。', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1559985/' },
  { depth: 984, name: '巨型等足虫', latin: 'Bathynomus giganteus', shape: 'isopod', text: '一层层甲片包住身体，贴着海底缓慢移动。', evidence: 'NOAA Windows to the Deep 2021：984 米观测记录。', url: 'https://oceanexplorer.noaa.gov/multimedia/okeanos-explorations-ex2107-gallery-media-dive09-isopod/' },
  { depth: 1300, name: '钝吻六鳃鲨', latin: 'Hexanchus griseus', shape: 'shark', text: '六道鳃裂，区别于多数鲨鱼的五道。', evidence: '展示位置 1,300 米；NatureScot 所列栖息深度可达 2,500 米。', url: 'https://www.nature.scot/doc/sharks-and-skates-scotland-report-bluntnose-sixgill-shark-hexanchus-griseus' },
  { depth: 2100, name: '深海鮟鱇', latin: 'Lophiiformes', shape: 'angler', color: '#b3b1e1', text: '头顶的小灯，是黑暗里的诱饵。', evidence: '类群示意，展示位置 2,100 米；MBARI 所列深海鮟鱇范围 300–4,000 米。', url: 'https://www.mbari.org/animal/deep-sea-anglerfish/' },
  { depth: 3000, name: '巨型幽灵水母', latin: 'Stygiomedusa gigantea', shape: 'jelly', color: '#c28eab', text: '四条带状口腕垂入黑暗，像一幅被海流轻轻展开的帘。', evidence: '展示位置 3,000 米；常见于午夜层，记录从海面至 6,700 米。', url: 'https://www.mbari.org/animal/giant-phantom-jelly/' },
  { depth: 3800, name: '泰坦尼克号', kind: 'landmark', shape: 'ship', text: '大西洋底，一艘船的故事停在这里。此处是跨海域的深度对照。', evidence: '采用 NOAA / WHOI 的约 3,800 米口径；不将常见的 3,824 米视为精确统一值。', url: 'https://www.whoi.edu/press-room/news-release/titanic-40th/' },
  { depth: 6957, name: '小飞象章鱼', latin: 'Grimpoteuthis', shape: 'octopus', color: '#d6b5d5', text: '耳朵一样的鳍，划过比深渊更深的水。', evidence: '爪哇海沟 6,957 米影像纪录，研究发表于 2020 年；不是巨型太平洋章鱼。', url: 'https://www.guinnessworldrecords.com/world-records/763272-deepest-cephalopod' },
  { depth: 8336, name: '超深渊狮子鱼', latin: 'Pseudoliparis sp.', shape: 'snailfish', color: '#ecd4d7', text: '半透明的小鱼，出现在人类曾以为鱼类难以抵达的地方。', evidence: '2022 年伊豆—小笠原海沟拍摄于 8,336 米，2023 年公布；并非马里亚纳海沟的观测。', url: 'https://www.guinnessworldrecords.com/world-records/deepest-fish' },
  { depth: 8848.86, name: '一座珠峰的高度', kind: 'landmark', shape: 'mountain', text: '向下走过的距离，已经相当于珠峰山顶的海拔。山不在这里，这是一把想象的尺。', evidence: '珠峰海拔 8,848.86 米；尼泊尔旅游部门公布值。', url: 'https://trade.ntb.gov.np/may/' },
  { depth: 10897, name: '海沟端足类', latin: 'Hirondellea gigas', shape: 'amphipod', color: '#e4d9bd', text: '在几乎到底的地方，仍能找到这些小小的甲壳动物。', evidence: '原始研究标本采自挑战者深渊 10,897 米。', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6449124/' },
];
export const sources = [
  { title: 'NOAA · 海洋分层', url: 'https://www.noaa.gov/jetstream/ocean/layers-of-ocean' },
  { title: 'NOAA · 挑战者深渊约 10,935 米', url: 'https://oceanexplorer.noaa.gov/ocean-fact/ocean-depth/' },
  { title: '美国海军研究办公室 · Trieste，1960 年 1 月 23 日', url: 'https://www.onr.navy.mil/media-center/news-releases/office-naval-research-recalls-role-vessels-record-breaking-deep-sea-dive' },
];
