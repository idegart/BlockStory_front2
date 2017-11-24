<template>
  <div class="footer">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <ul class="footer-links">
          <li>
            <a href="https://vk.com/blockstory_ru" target="_blank"><icon name="vk"></icon></a>
          </li>
          <li>
            <a href="mailto:support@blockstory.ru" target="_blank"><icon name="envelope"></icon></a>
          </li>
        </ul>
      </el-col>
      <el-col :span="6">
        BlockStory
      </el-col>
      <el-col :span="6">
        <el-dropdown @command="changeLang">
          <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
          <span style="cursor: pointer; text-transform: uppercase"><icon name="language"></icon> ru</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="ru">Русский</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <router-link :to="{name: 'Agreement'}">Соглашение</router-link>

      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      methods: {
        changeLang(e){
          console.log(e);
        }
      }
    }
</script>

<style scoped>
  .footer{
    padding-top: 10px;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .footer-links{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .footer-links li{
    float: left;
  }
  .footer-links li a{
    color: #333;
    display: block;
    padding: 5px;
    margin: 0 10px;
  }
</style>
