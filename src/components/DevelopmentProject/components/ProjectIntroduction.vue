<template>
  <el-card>
    <h3>项目简介</h3>
    <el-form ref="ruleForm" :disabled="disabled" :rules="rules" :model="companyProjectMessage" label-width="100px" class="demo-ruleForm" label-position="top">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="项目类型" prop="projectType" class="must-form-item">
            <el-input v-model="companyProjectMessage.projectType" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目规模（KW）" prop="projectScale" class="must-form-item">
            <el-input v-model="companyProjectMessage.projectScale" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地理位置" class="must-form-item">
            <el-cascader v-model="companyProjectMessage.address" :options="options" style="width:100%;" @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="屋顶类型" prop="houseTopType" class="must-form-item">
            <el-input v-model="companyProjectMessage.houseTopType" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="周边产业聚集情况（限300字内）" prop="aroundFactoryMessage" class="must-form-item">
            <el-input v-model="companyProjectMessage.aroundFactoryMessage" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="屋顶面积（m²）" prop="houseTopArea" class="must-form-item">
            <el-input v-model="companyProjectMessage.houseTopArea" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="受点容量" prop="capacity" class="must-form-item">
            <el-input v-model="companyProjectMessage.capacity" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当地光照情况" prop="sunShineMessage">
            <el-input v-model="companyProjectMessage.sunShineMessage" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="台风/暴雨等极端天气情况" prop="extremeWeatherMessage">
            <el-input v-model="companyProjectMessage.extremeWeatherMessage" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="安装方式" prop="installWay" class="must-form-item">
            <el-input v-model="companyProjectMessage.installWay" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="接入方式" prop="insertWay" class="must-form-item">
            <el-input v-model="companyProjectMessage.insertWay" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当地并网政策" prop="localGirdConnection" class="must-form-item">
            <el-input v-model="companyProjectMessage.localGirdConnection" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合作模式" prop="coopModel" class="must-form-item">
            <el-input v-model="companyProjectMessage.coopModel" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="脱硫煤火电价格（含税、元/度）" prop="resourcePrice" class="must-form-item">
            <el-input v-model="companyProjectMessage.resourcePrice" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一般工业-商业电价（元/度）" prop="electricityPrice" class="must-form-item">
            <el-input v-model="companyProjectMessage.electricityPrice" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业主年均用电折扣（%）" prop="electricityDiscount" class="must-form-item">
            <!-- <el-input v-model="companyProjectMessage.electricityDiscount" /> -->
            <c-input-number v-model="companyProjectMessage.electricityDiscount" :multiple="100" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="自发自用比列（%）" prop="selfUseScale" class="must-form-item">
            <!-- <el-input v-model="companyProjectMessage.selfUseScale" /> -->
            <c-input-number v-model="companyProjectMessage.selfUseScale" :multiple="100" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="项目造价（元/瓦）" prop="buildCost" class="must-form-item">
            <el-input v-model="companyProjectMessage.buildCost" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="组件价格（元/瓦）" prop="elementPrice" class="must-form-item">
            <el-input v-model="companyProjectMessage.elementPrice" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="逆变器价格（元/瓦）" prop="inverterPrice" class="must-form-item">
            <el-input v-model="companyProjectMessage.inverterPrice" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="其他EPC（小EPC）(元/瓦)" prop="otherEpc" class="must-form-item">
            <el-input v-model="companyProjectMessage.otherEpc" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="设计价格（元/瓦）" prop="designPrice" class="must-form-item">
            <el-input v-model="companyProjectMessage.designPrice" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理费（居间费）（元/瓦）" prop="manageFree" class="must-form-item">
            <el-input v-model="companyProjectMessage.manageFree" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="防水租金（万元/年）" prop="waterProofRent" class="must-form-item">
            <!-- <el-input v-model="companyProjectMessage.waterProofRent" /> -->
            <c-input-number v-model="companyProjectMessage.waterProofRent" :multiple="0.0001" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="租金（万元/年）" prop="rent" class="must-form-item">
            <!-- <el-input v-model="companyProjectMessage.rent" /> -->
            <c-input-number v-model="companyProjectMessage.rent" :multiple="0.0001" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="系统运营内部收益率（%）" prop="businessInsideProfix" class="must-form-item">
            <!-- <el-input v-model="companyProjectMessage.businessInsideProfix" /> -->
            <c-input-number v-model="companyProjectMessage.businessInsideProfix" :multiple="100" controls-position="right" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目投资回收期（年）" prop="investBackTime" class="must-form-item">
            <el-input v-model="companyProjectMessage.investBackTime" :min="1" :max="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="!isShow" style="display: flex;justify-content: flex-end;">
        <!-- <el-button plain>取 消</el-button> -->
        <el-button :loading="btnLoading" type="primary" @click="companyProjectMessageSave">保 存</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { setProjectCompanyProjectMessage } from '@/api/developmentProject'
export default {
  inject: ['refreshing'],
  props: {
    seProjectCompanyProjectMessage: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkTwo = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /(^[0-9]{1,9}$)|(^[0-9]{1,9}[\.]{1}[0-9]{1,2}$)/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，小数点后2位'))
      }
      // }
    }
    var checkFour = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^\d+(?:\.\d{0,4})?$/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字或小数点后4位'))
      }
      // }
    }
    var checkF = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^\d+(?:\.\d{0})?$/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字或小数点后4位'))
      }
      // }
    }
    var checkOne = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      // const reg = /^[0-9]+\.?[0-9]{0,2}$/
      const reg = /^(0(\.\d{1,4})?|1(\.0{1,4})?)$/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，0-100之间，小数点后2位'))
      }
      // }
    }
    var checkCe = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^([1-9][0-9]{0,1}(\.[0-9]{1,2})?|100)$/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，1-100之间，小数点后2位'))
      }
    }
    // }
    var checkInteger = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{0,50}$/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('1-50字符，限中文、英文'))
      }
      // }
    }
    return {
      companyProjectMessage: {},
      options: [
        { value: '浙江',
          label: '浙江',
          children: [
            { value: '杭州', label: '杭州' },
            { value: '宁波', label: '宁波' },
            { value: '温州', label: '温州' },
            { value: '湖州', label: '湖州' },
            { value: '嘉兴', label: '嘉兴' },
            { value: '绍兴', label: '绍兴' },
            { value: '金华', label: '金华' },
            { value: '衢州', label: '衢州' },
            { value: '舟山', label: '舟山' },
            { value: '台州', label: '台州' },
            { value: '丽水', label: '丽水' }
          ]
        },
        { value: '新疆',
          label: '新疆',
          children: [
            { value: '乌鲁木齐', label: '乌鲁木齐' },
            { value: '巴音郭楞', label: '巴音郭楞' },
            { value: '昌吉', label: '昌吉' },
            { value: '塔城地区', label: '塔城地区' },
            { value: '阿勒泰地区', label: '阿勒泰地区' },
            { value: '克拉玛依', label: '克拉玛依' },
            { value: '博尔塔拉', label: '博尔塔拉' },
            { value: '伊犁', label: '伊犁' },
            { value: '阿克苏地区', label: '阿克苏地区' },
            { value: '吐鲁番地区', label: '吐鲁番地区' },
            { value: '喀什地区', label: '喀什地区' },
            { value: '哈密地区', label: '哈密地区' },
            { value: '克孜勒苏', label: '克孜勒苏' },
            { value: '和田地区', label: '和田地区' }
          ]
        },
        { value: '山东',
          label: '山东',
          children: [
            { value: '济南', label: '济南' },
            { value: '青岛', label: '青岛' },
            { value: '滨州', label: '滨州' },
            { value: '德州', label: '德州' },
            { value: '东营', label: '东营' },
            { value: '菏泽', label: '菏泽' },
            { value: '莱芜', label: '莱芜' },
            { value: '济宁', label: '济宁' },
            { value: '聊城', label: '聊城' },
            { value: '临沂', label: '临沂' },
            { value: '日照', label: '日照' },
            { value: '泰安', label: '泰安' },
            { value: '潍坊', label: '潍坊' },
            { value: '威海', label: '威海' },
            { value: '烟台', label: '烟台' },
            { value: '淄博', label: '淄博' },
            { value: '枣庄', label: '枣庄' }
          ]
        },
        { value: '青海',
          label: '青海',
          children: [
            { value: '西宁', label: '西宁' },
            { value: '海东地区', label: '海东地区' },
            { value: '海北州', label: '海北州' },
            { value: '黄南州', label: '黄南州' },
            { value: '海南州', label: '海南州' },
            { value: '果洛州', label: '果洛州' },
            { value: '玉树州', label: '玉树州' },
            { value: '海西州', label: '海西州' }
          ]
        },
        { value: '宁夏',
          label: '宁夏',
          children: [
            { value: '银川', label: '银川' },
            { value: '吴忠', label: '吴忠' },
            { value: '石嘴山', label: '石嘴山' },
            { value: '中卫', label: '中卫' },
            { value: '固原', label: '固原' }
          ]
        },
        { value: '内蒙古',
          label: '内蒙古',
          children: [
            { value: '呼和浩特', label: '呼和浩特' },
            { value: '包头', label: '包头' },
            { value: '乌海', label: '乌海' },
            { value: '赤峰', label: '赤峰' },
            { value: '通辽', label: '通辽' },
            { value: '锡林郭勒盟', label: '锡林郭勒盟' },
            { value: '鄂尔多斯', label: '鄂尔多斯' },
            { value: '呼伦贝尔', label: '呼伦贝尔' },
            { value: '巴彦淖尔', label: '巴彦淖尔' },
            { value: '乌兰察布', label: '乌兰察布' },
            { value: '兴安盟', label: '兴安盟' },
            { value: '阿拉善盟', label: '阿拉善盟' }
          ]
        },
        { value: '江苏',
          label: '江苏',
          children: [
            { value: '南京', label: '南京' },
            { value: '无锡', label: '无锡' },
            { value: '南通', label: '南通' },
            { value: '徐州', label: '徐州' },
            { value: '常州', label: '常州' },
            { value: '苏州', label: '苏州' },
            { value: '连云港', label: '连云港' },
            { value: '淮安', label: '淮安' },
            { value: '盐城', label: '盐城' },
            { value: '扬州', label: '扬州' },
            { value: '镇江', label: '镇江' },
            { value: '泰州', label: '泰州' },
            { value: '宿迁', label: '宿迁' }
          ]
        },
        { value: '河南',
          label: '河南',
          children: [
            { value: '郑州', label: '郑州' },
            { value: '开封', label: '开封' },
            { value: '平顶山', label: '平顶山' },
            { value: '洛阳', label: '洛阳' },
            { value: '商丘', label: '商丘' },
            { value: '安阳', label: '安阳' },
            { value: '新乡', label: '新乡' },
            { value: '许昌', label: '许昌' },
            { value: '鹤壁', label: '鹤壁' },
            { value: '焦作', label: '焦作' },
            { value: '濮阳', label: '濮阳' },
            { value: '漯河', label: '漯河' },
            { value: '三门峡', label: '三门峡' },
            { value: '周口', label: '周口' },
            { value: '驻马店', label: '驻马店' },
            { value: '南阳', label: '南阳' },
            { value: '信阳', label: '信阳' },
            { value: '济源', label: '济源' }
          ]
        },
        { value: '河北',
          label: '河北',
          children: [
            { value: '石家庄', label: '石家庄' },
            { value: '保定', label: '保定' },
            { value: '沧州', label: '沧州' },
            { value: '邢台', label: '邢台' },
            { value: '邯郸', label: '邯郸' },
            { value: '衡水', label: '衡水' },
            { value: '唐山', label: '唐山' },
            { value: '秦皇岛', label: '秦皇岛' },
            { value: '张家口', label: '张家口' },
            { value: '承德', label: '承德' },
            { value: '廊坊', label: '廊坊' }
          ]
        },
        { value: '甘肃',
          label: '甘肃',
          children: [
            { value: '兰州', label: '兰州' },
            { value: '天水', label: '天水' },
            { value: '白银', label: '白银' },
            { value: '平凉', label: '平凉' },
            { value: '庆阳', label: '庆阳' },
            { value: '陇南', label: '陇南' },
            { value: '定西', label: '定西' },
            { value: '金昌', label: '金昌' },
            { value: '武威', label: '武威' },
            { value: '张掖', label: '张掖' },
            { value: '酒泉', label: '酒泉' },
            { value: '嘉峪关', label: '嘉峪关' },
            { value: '临夏州', label: '临夏州' },
            { value: '甘南州', label: '甘南州' }
          ]
        },
        { value: '安徽',
          label: '安徽',
          children: [
            { value: '淮北', label: '淮北' },
            { value: '宿州', label: '宿州' },
            { value: '蚌埠', label: '蚌埠' },
            { value: '亳州', label: '亳州' },
            { value: '阜阳', label: '阜阳' },
            { value: '淮南', label: '淮南' },
            { value: '滁州', label: '滁州' },
            { value: '六安', label: '六安' },
            { value: '合肥', label: '合肥' },
            { value: '巢湖', label: '巢湖' },
            { value: '马鞍山', label: '马鞍山' },
            { value: '芜湖', label: '芜湖' },
            { value: '宣城', label: '宣城' },
            { value: '铜陵', label: '铜陵' },
            { value: '安庆', label: '安庆' },
            { value: '池州', label: '池州' },
            { value: '黄山', label: '黄山' }
          ]
        },
        { value: '陕西',
          label: '陕西',
          children: [
            { value: '西安', label: '西安' },
            { value: '宝鸡', label: '宝鸡' },
            { value: '渭南', label: '渭南' },
            { value: '咸阳', label: '咸阳' },
            { value: '铜川', label: '铜川' },
            { value: '延安', label: '延安' },
            { value: '商洛', label: '商洛' },
            { value: '汉中', label: '汉中' },
            { value: '榆林', label: '榆林' },
            { value: '安康', label: '安康' }
          ]
        },
        { value: '福建',
          label: '福建',
          children: [
            { value: '泉州', label: '泉州' },
            { value: '三明', label: '三明' },
            { value: '南平', label: '南平' },
            { value: '龙岩', label: '龙岩' },
            { value: '漳州', label: '漳州' },
            { value: '宁德', label: '宁德' },
            { value: '莆田', label: '莆田' },
            { value: '福州', label: '福州' },
            { value: '厦门', label: '厦门' }
          ]
        },
        { value: '广东',
          label: '广东',
          children: [
            { value: '广州', label: '广州' },
            { value: '深圳', label: '深圳' },
            { value: '珠海', label: '珠海' },
            { value: '汕头', label: '汕头' },
            { value: '佛山', label: '佛山' },
            { value: '韶关', label: '韶关' },
            { value: '湛江', label: '湛江' },
            { value: '肇庆', label: '肇庆' },
            { value: '江门', label: '江门' },
            { value: '茂名', label: '茂名' },
            { value: '惠州', label: '惠州' },
            { value: '梅州', label: '梅州' },
            { value: '汕尾', label: '汕尾' },
            { value: '河源', label: '河源' },
            { value: '阳江', label: '阳江' },
            { value: '清远', label: '清远' },
            { value: '东莞', label: '东莞' },
            { value: '中山', label: '中山' },
            { value: '潮州', label: '潮州' },
            { value: '揭阳', label: '揭阳' },
            { value: '云浮', label: '云浮' }
          ]
        },
        { value: '山西',
          label: '山西',
          children: [
            { value: '太原', label: '太原' },
            { value: '大同', label: '大同' },
            { value: '阳泉', label: '阳泉' },
            { value: '长治', label: '长治' },
            { value: '晋城', label: '晋城' },
            { value: '朔州', label: '朔州' },
            { value: '晋中', label: '晋中' },
            { value: '运城', label: '运城' },
            { value: '忻州', label: '忻州' },
            { value: '临汾', label: '临汾' },
            { value: '吕梁', label: '吕梁' }
          ]
        },
        { value: '湖北',
          label: '湖北',
          children: [
            { value: '武汉', label: '武汉' },
            { value: '黄石', label: '黄石' },
            { value: '荆州', label: '荆州' },
            { value: '宜昌', label: '宜昌' },
            { value: '十堰', label: '十堰' },
            { value: '孝感', label: '孝感' },
            { value: '荆门', label: '荆门' },
            { value: '鄂州', label: '鄂州' },
            { value: '黄冈', label: '黄冈' },
            { value: '咸宁', label: '咸宁' },
            { value: '随州', label: '随州' },
            { value: '恩施', label: '恩施' },
            { value: '潜江', label: '潜江' },
            { value: '仙桃', label: '仙桃' },
            { value: '天门', label: '天门' },
            { value: '襄阳', label: '襄阳' }
          ]
        },
        { value: '四川',
          label: '四川',
          children: [
            { value: '成都', label: '' },
            { value: '绵阳', label: '' },
            { value: '自贡', label: '' },
            { value: '攀枝花', label: '' },
            { value: '泸州', label: '' },
            { value: '德阳', label: '' },
            { value: '广元', label: '' },
            { value: '遂宁', label: '' },
            { value: '内江', label: '' },
            { value: '乐山', label: '' },
            { value: '资阳', label: '' },
            { value: '宜宾', label: '' },
            { value: '南充', label: '' },
            { value: '达州', label: '' },
            { value: '雅安', label: '' },
            { value: '阿坝', label: '' },
            { value: '甘孜', label: '' },
            { value: '广安', label: '' },
            { value: '巴中', label: '' },
            { value: '眉山', label: '' },
            { value: '凉山', label: '' }
          ]
        },
        { value: '江西',
          label: '江西',
          children: [
            { value: '南昌', label: '南昌' },
            { value: '上饶', label: '上饶' },
            { value: '九江', label: '九江' },
            { value: '景德镇', label: '景德镇' },
            { value: '萍乡', label: '萍乡' },
            { value: '新余', label: '新余' },
            { value: '鹰潭', label: '鹰潭' },
            { value: '赣州', label: '赣州' },
            { value: '宜春', label: '宜春' },
            { value: '吉安', label: '吉安' },
            { value: '抚州', label: '抚州' }
          ]
        },
        { value: '湖南',
          label: '湖南',
          children: [
            { value: '长沙', label: '长沙' },
            { value: '株洲', label: '株洲' },
            { value: '湘潭', label: '湘潭' },
            { value: '衡阳', label: '衡阳' },
            { value: '邵阳', label: '邵阳' },
            { value: '岳阳', label: '岳阳' },
            { value: '常德', label: '常德' },
            { value: '张家界', label: '张家界' },
            { value: '益阳', label: '益阳' },
            { value: '郴州', label: '郴州' },
            { value: '永州', label: '永州' },
            { value: '怀化', label: '怀化' },
            { value: '娄底', label: '娄底' },
            { value: '湘西', label: '湘西' }
          ]
        },
        { value: '海南',
          label: '海南',
          children: [
            { value: '海口', label: '海口' },
            { value: '三亚', label: '三亚' }
          ]
        },
        { value: '辽宁',
          label: '辽宁',
          children: [
            { value: '沈阳', label: '沈阳' },
            { value: '大连', label: '大连' },
            { value: '鞍山', label: '鞍山' },
            { value: '抚顺', label: '抚顺' },
            { value: '本溪', label: '本溪' },
            { value: '丹东', label: '丹东' },
            { value: '锦州', label: '锦州' },
            { value: '营口', label: '营口' },
            { value: '阜新', label: '阜新' },
            { value: '辽阳', label: '辽阳' },
            { value: '盘锦', label: '盘锦' },
            { value: '铁岭', label: '铁岭' },
            { value: '朝阳', label: '朝阳' },
            { value: '葫芦岛', label: '葫芦岛' }
          ]
        },
        { value: '北京',
          label: '北京',
          children: [{ value: '北京', label: '北京' }]
        },
        { value: '天津',
          label: '天津',
          children: [{ value: '天津', label: '天津' }]
        },
        { value: '重庆',
          label: '重庆',
          children: [{ value: '重庆', label: '重庆' }]
        },
        { value: '上海',
          label: '上海',
          children: [{ value: '上海', label: '上海' }]
        },
        { value: '吉林',
          label: '吉林',
          children: [
            { value: '长春', label: '长春' },
            { value: '吉林', label: '吉林' },
            { value: '四平', label: '四平' },
            { value: '白城', label: '白城' },
            { value: '松原', label: '松原' },
            { value: '延边', label: '延边' },
            { value: '通化', label: '通化' },
            { value: '白山', label: '白山' },
            { value: '辽源', label: '辽源' }
          ]
        },
        { value: '黑龙江',
          label: '黑龙江',
          children: [
            { value: '哈尔滨', label: '哈尔滨' },
            { value: '齐齐哈尔', label: '齐齐哈尔' },
            { value: '牡丹江', label: '牡丹江' },
            { value: '佳木斯', label: '佳木斯' },
            { value: '大庆', label: '大庆' },
            { value: '鸡西', label: '鸡西' },
            { value: '双鸭山', label: '双鸭山' },
            { value: '伊春', label: '伊春' },
            { value: '七台河', label: '七台河' },
            { value: '鹤岗', label: '鹤岗' },
            { value: '黑河', label: '黑河' },
            { value: '绥化', label: '绥化' },
            { value: '大兴安岭', label: '大兴安岭' }
          ]
        },
        { value: '贵州',
          label: '贵州',
          children: [
            { value: '贵阳', label: '贵阳' },
            { value: '遵义', label: '遵义' },
            { value: '黔南', label: '黔南' },
            { value: '黔东', label: '黔东' },
            { value: '毕节', label: '毕节' },
            { value: '黔西', label: '黔西' },
            { value: '铜仁', label: '铜仁' },
            { value: '安顺', label: '安顺' },
            { value: '六盘水', label: '六盘水' }
          ]
        },
        { value: '云南',
          label: '云南',
          children: [
            { value: '昆明', label: '昆明' },
            { value: '曲靖', label: '曲靖' },
            { value: '玉溪', label: '玉溪' },
            { value: '丽江', label: '丽江' },
            { value: '普洱', label: '普洱' },
            { value: '保山', label: '保山' },
            { value: '昭通', label: '昭通' },
            { value: '迪庆', label: '迪庆' },
            { value: '怒江', label: '怒江' },
            { value: '大理', label: '大理' },
            { value: '德宏', label: '德宏' },
            { value: '楚雄', label: '楚雄' },
            { value: '西双版纳', label: '西双版纳' },
            { value: '临沧', label: '临沧' }
          ]
        },
        { value: '广西',
          label: '广西',
          children: [
            { value: '南宁', label: '南宁' },
            { value: '柳州', label: '柳州' },
            { value: '桂林', label: '桂林' },
            { value: '梧州', label: '梧州' },
            { value: '北海', label: '北海' },
            { value: '防城港', label: '防城港' },
            { value: '钦州', label: '钦州' },
            { value: '贵港', label: '贵港' },
            { value: '玉林', label: '玉林' },
            { value: '百色', label: '百色' },
            { value: '贺州', label: '贺州' },
            { value: '河池', label: '河池' },
            { value: '来宾', label: '来宾' },
            { value: '崇左', label: '崇左' }
          ]
        }
      ],
      rules: {
        projectType: [
          { message: '请输入项目类型', trigger: 'blur' },
          { validator: checkInteger, trigger: 'blur' }
        ],
        projectScale: [
          { message: '请输入项目规模', trigger: 'blur' },
          { validator: checkTwo, trigger: 'blur' }
        ],
        // address: [
        //   { message: '请输入地址', trigger: 'blur' },
        //   { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        // ],
        houseTopType: [
          { message: '请输入屋顶类型', trigger: 'blur' },
          { validator: checkInteger, trigger: 'blur' }
        ],
        aroundFactoryMessage: [
          { message: '请输入周边产业聚集情况（限300字内）', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ],
        houseTopArea: [
          { message: '请输入屋顶面积', trigger: 'blur' },
          { validator: checkTwo, trigger: 'blur' }
        ],
        capacity: [
          { message: '请输入受点容量', trigger: 'blur' }
          // { validator: checkTwo, trigger: 'blur' }
        ],
        installWay: [
          { message: '请输入安装方式', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        insertWay: [
          { message: '请输入接入方式', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        localGirdConnection: [
          { message: '请输入当地并网政策', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        coopModel: [
          { message: '请输入合作模式', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        resourcePrice: [
          // { message: '请输入脱硫煤火电价格', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        electricityPrice: [
          // { message: '请输入一般工业-商业电价', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        electricityDiscount: [
          // { message: '请输入业主年均用电折扣', trigger: 'blur', type: 'number' }
          { validator: checkOne, trigger: 'blur' }
        ],
        selfUseScale: [
          // { message: '请输入自发自用比列', trigger: 'blur', type: 'number' }
          { validator: checkOne, trigger: 'blur' }
        ],
        buildCost: [
          // { message: '请输入项目造价', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        elementPrice: [
          // { message: '请输入组件价格', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        inverterPrice: [
          // { message: '请输入逆变器价格', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        otherEpc: [
          // { message: '请输入其他EPC（小EPC）', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        designPrice: [
          // { message: '请输入设计价格', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        manageFree: [
          // { message: '请输入管理费', trigger: 'blur' },
          { validator: checkFour, trigger: 'blur' }
        ],
        waterProofRent: [
          { message: '请输入防水租金', trigger: 'blur', type: 'number' },
          { validator: checkF, trigger: 'blur' }
        ],
        rent: [
          { message: '请输入租金', trigger: 'blur', type: 'number' },
          { validator: checkF, trigger: 'blur' }
        ],
        businessInsideProfix: [
          // { message: '请输入系统运营内部收益率', trigger: 'blur', type: 'number' }
          { validator: checkOne, trigger: 'blur' }
        ],
        investBackTime: [
          // { message: '请输入项目投资回收期', trigger: 'blur' },
          { validator: checkCe, trigger: 'blur' }
        ]
      },
      submiting: false
    }
  },
  computed: {
    btnLoading() {
      console.log(this)
      return this.refreshing.value || this.submiting || false
    }
  },
  watch: {
    seProjectCompanyProjectMessage(oldVal, newVal) {
      this.companyProjectMessage = oldVal
      if (this.companyProjectMessage.address) {
        const add = this.companyProjectMessage.address.split('-')
        this.companyProjectMessage.address = add
      }
    }
  },
  methods: {
    // 项目简介
    companyProjectMessageSave() {
      // this.$refs.ruleForm.validate(valid => {
      // if (valid) {
      if (this.companyProjectMessage.address) {
        const add = this.companyProjectMessage.address.join('-')
        this.companyProjectMessage.address = add
      }
      if (this.submiting) { return }
      this.submiting = true
      this.companyProjectMessage.projectId = this.$route.query.projectId
      setProjectCompanyProjectMessage(this.companyProjectMessage).then(res => {
        if (this.companyProjectMessage.address) {
          const add = this.companyProjectMessage.address.split('-')
          this.companyProjectMessage.address = add
        }
        this.$message.success(res.msg)
        if (!this.companyProjectMessage.projectMessageId) {
          this.$emit('saveRefresh', 'seProjectCompanyProjectMessage')
        }
      }).finally(() => {
        this.submiting = false
      })
      // } else {
      //   return false
      // }
      // })
    },
    handleChange(value) {
      // console.log(value)
      this.companyProjectMessage.address = value
    }
  }
}
</script>

<style lang="scss" scoped>
.must-form-item {
  .el-form-item__label:before, thead th > .cell:before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
