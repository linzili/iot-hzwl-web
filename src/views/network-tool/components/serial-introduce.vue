<template>
  <a-collapse :bordered="false" default-active-key="1" class="mt-4">
    <a-collapse-panel key="1" header="使用说明">
      <a-typography-title :level="5">1. 下载虚拟串口工具</a-typography-title>
      <a-typography-paragraph>
        下载
        <a-typography-link
          href="https://onboardcloud.dl.sourceforge.net/project/com0com/com0com/3.0.0.0/com0com-3.0.0.0-i386-and-x64-signed.zip?viasf=1"
        >
          com0com
        </a-typography-link>
        ，在本地创建虚拟串口对。
      </a-typography-paragraph>
      <a-typography-title :level="5">2. 下载串口映射工具</a-typography-title>
      <a-typography-paragraph>
        下载
        <a-typography-link> 串口映射 </a-typography-link>
        工具，完成安装后打开本地串口，创建服务端口。
      </a-typography-paragraph>
      <a-typography-title :level="5">3. 配置</a-typography-title>
      <a-typography-paragraph> 根据串口映射工具配置信息完成平台地址以及端口信息。 </a-typography-paragraph>
      <a-typography-title :level="5">4. 打开映射</a-typography-title>
      <a-typography-paragraph> 配置完成后，点击打开映射，串口映射工具显示已连接，则映射成功。</a-typography-paragraph>
    </a-collapse-panel>
  </a-collapse>
</template>
