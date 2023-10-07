import { exec } from '@actions/exec';

const setupUser = async () => {
  await exec('git', ['config', 'user.name', '"JingHuangSu1996"']);
  await exec('git', ['config', 'user.email', '"jing.tech.tw@gmail.com"']);
};

(async () => {
  await setupUser();
})();
