<template>
  <div class="flex">
    <div class="design-tools-warp">
      <div class="design-tools-nav" style="padding-bottom: 0px">
        <ul class="nav-scroll-list">
          <li class="nav-item">
            <router-link
              :to="{ name: 'resource-recommend' }"
              class="nav-item__link"
              exact-active-class="router-link-active"
            >
              <svg
                role="img"
                aria-label="compass"
                focusable="false"
                data-icon="compass"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-22 h-22 mr-10"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.4189 7.52705L16.0513 7.31623C16.4422 7.18593 16.8141 7.5578 16.6838 7.94868L16.473 8.58114L16.4098 8.77073L16.4071 8.77878L14.5 14.5L8.77878 16.4071L8.77073 16.4098L8.58114 16.473L7.94868 16.6838C7.5578 16.8141 7.18593 16.4422 7.31623 16.0513L7.52705 15.4189L7.59024 15.2293L7.59293 15.2212L9.5 9.5L15.2212 7.59293L15.2293 7.59024L15.4189 7.52705ZM10.6859 10.6859L9.37171 14.6283L13.3141 13.3141L14.6283 9.37171L10.6859 10.6859Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span class="nav-item__title">为你推荐</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'resource-template' }"
              class="nav-item__link"
              exact-active-class="router-link-active"
            >
              <svg
                role="img"
                aria-label="template"
                focusable="false"
                data-icon="template"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-22 h-22 mr-10"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 4.5C4.72386 4.5 4.5 4.72386 4.5 5V19C4.5 19.2761 4.72386 19.5 5 19.5H14.2C14.4761 19.5 14.7 19.2761 14.7 19V5C14.7 4.72386 14.4761 4.5 14.2 4.5H5ZM3 5C3 3.89543 3.89543 3 5 3H14.2C15.3046 3 16.2 3.89543 16.2 5V19C16.2 19.1726 16.1781 19.3401 16.137 19.4998C16.1781 19.3401 16.2 19.1726 16.2 19V18.5863L18.5694 19.0041C18.8413 19.052 19.1007 18.8704 19.1486 18.5985L20.9255 8.52153C20.9734 8.24958 20.7918 7.99025 20.5199 7.9423L16.2 7.18059V5.65745L20.7804 6.46509C21.8681 6.65689 22.5945 7.69421 22.4027 8.782L20.6258 18.8589C20.434 19.9467 19.3967 20.6731 18.3089 20.4813L15.8986 20.0563C15.8986 20.0563 15.8986 20.0563 15.8987 20.0562C15.5456 20.6229 14.9168 21 14.2 21H5C3.89543 21 3 20.1046 3 19V5Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span class="nav-item__title">模板中心</span>
            </router-link>
          </li>
          <li class="group-title">个人空间</li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'resource-create' }"
              class="nav-item__link"
              exact-active-class="router-link-active"
            >
              <svg
                role="img"
                aria-label="open-file"
                focusable="false"
                data-icon="open-file"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-22 h-22 mr-10"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.1472 6.49074L11.5952 7H12.2734H19.5C19.7761 7 20 7.22386 20 7.5V11H21.5V7.5C21.5 6.39543 20.6046 5.5 19.5 5.5H12.2734L10.6715 3.67901C10.2918 3.24737 9.74475 3 9.16987 3H4.5C3.39543 3 2.5 3.89543 2.5 5V18C2.5 19.1046 3.39543 20 4.5 20H13.5V18.5H4.5C4.22386 18.5 4 18.2761 4 18V5C4 4.72386 4.22386 4.5 4.5 4.5H9.16987C9.31359 4.5 9.45036 4.56184 9.54529 4.66975L11.1472 6.49074ZM15.5 17.75H18.75V21H20.25V17.75H23.5V16.25H20.25V13H18.75V16.25H15.5V17.75Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span class="nav-item__title">创建设计</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-1 pt-20 pr-32 pb-24 pl-16">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.router-link-active {
  font-weight: 600;
  background: #f5f7fd;
}

.design-tools-warp {
  width: 220px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  overflow: auto;

  .design-tools-nav {
    position: relative;
    margin: 0;
    padding-top: 20px;
    width: 100%;
    padding-bottom: 0px;

    .nav-scroll-list {
      transition: all 0.2s;
      padding-bottom: 18px;

      .group-title {
        padding-left: 18px;
        margin-top: 18px;
        margin-bottom: 14px;
        font-size: 12px;
        color: #8693ab;
        position: relative;
      }

      .nav-item {
        margin-top: 4px;
        margin-left: 18px;

        .nav-item__link {
          display: flex;
          align-items: center;
          width: 185px;
          height: 40px;
          padding-left: 15px;
          position: relative;
          cursor: pointer;
          border-radius: 8px;

          .nav-item__icon {
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            margin-right: 10px;
            flex-shrink: 0;
          }

          .nav-item__title {
            position: relative;
            font-size: 14px;
            color: #1b2337;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex-shrink: 0;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
