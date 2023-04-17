<?php
    require_once("php/config.php");
    $idx = $_GET['idx'];
    $sql = "SELECT * FROM lake_bbs WHERE idx = '$idx'";
    $result = mysqli_query($connect, $sql);
?>

<? include('head.inc')  ?>
    
    <header class="text-center board_header">

<? include('banner.inc')  ?>    

    <main id="update">
      <div class="write_wrapper">
        
      <? if($row = mysqli_fetch_array($result)) { ?>
      <form action="php/update_ok.php" method="POST" class="write_form">
          <fieldset>
            <div class="write_field">
                <input type="hidden" name="idx" value="<?= $idx ?>">
              <p>
                <label for="title" class="hidden">제목:</label>
                <input type="text" id="title" name="title" value="<?= $row['title'] ?>"
                />
              </p>
              <p>
                <label for="name" class="hidden">이름:</label>
                <input
                  type="text" id="name" name="name" value="<?= $row['name'] ?>"
                />
              </p>
              <p>
                <label for="content" class="hidden">내용:</label>
                <textarea name="content" id="content" cols="32" rows="8" value=""><?= $row['content'] ?></textarea>
              </p>
            </div>
            <p></p>
          </fieldset>
          <button class="board_common_btn">글작성</button>
        </form>
        <? } mysqli_close($connect); ?>
      </div>
    </main>

<? include('foot.inc')  ?>

    <script
      src="https://code.jquery.com/jquery-3.6.3.min.js"
      integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"
      integrity="sha256-lSjKY0/srUM9BE3dPm+c4fBo1dky2v27Gdjm2uoZaL0="
      crossorigin="anonymous"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
    <script src="js/back.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>